import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'
import { pusherServer } from "@/app/libs/pusher";
/* eslint-disable */
interface iParams{
    conversationId?:string;
}

export async function POST(request:Request,{params}:{params:iParams}){
    try {
          
       const currentUser = await getCurrentUser();
       const {conversationId} = params;

       if(!currentUser?.id || !currentUser?.email){
           return new NextResponse('Unauthorized' , {status:401});
       }

       const conversation = await prisma.conversation.findUnique({
        where:{
            id:conversationId
        },
        include:{
            messages:{
                include:{
                    seen:true
                }
            },
            users:true,
        }
       })

       if(!conversation){
          return new NextResponse('Invalid Id' , {status:400});
       }

       //find last message
       const lastMessage = conversation.messages[conversation.messages.length-1];

       if(!lastMessage){
        return NextResponse.json(conversation);
       }

       //update seen of last message
       const updatedMessage = await prisma.message.update({
        where:{
            id:lastMessage.id
        },
        include:{
            sender:true,
            seen:true
        },
        data:{
            seen:{
                connect:{
                    id:currentUser.id
                }
            }
        }
       })
    
       await pusherServer.trigger(currentUser.email,'conversation:update',{
         id:conversationId,
         messages:[updatedMessage]
       })
          
       if(lastMessage.seenIds.indexOf(currentUser.id)!==-1){
          return NextResponse.json(conversation);
       }

       await pusherServer.trigger(conversationId!,'message:update',updatedMessage);

       return NextResponse.json(updatedMessage);

    } catch (error:any) {
        console.log(error, 'ERROR_MESSAGE_SEEN');
        return new NextResponse('INTERNAL ERROR',{status:500});
    }
}