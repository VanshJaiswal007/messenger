import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import { pusherServer } from "@/app/libs/pusher";

interface Iparams {
    conversationId?:string
}

export async function DELETE(request:Request,{params}:{params:Iparams}){
    try {
        const {conversationId} = params;
        const currentUser = await getCurrentUser();

        if(!currentUser?.id){
            return new NextResponse('Unauthorized',{status:401});
        }

        const exisitingConversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                users:true
            }
        })

        if(!exisitingConversation){
            return new NextResponse('Invalid ID',{status:400});
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where:{
                id:conversationId,
                userIds:{
                    hasSome:[currentUser.id]
                }
            }
        })

        exisitingConversation.users.forEach((user)=>{
            if(user.email){
                pusherServer.trigger(user.email,'conversation:remove',exisitingConversation);
            }
        })

        return NextResponse.json(deletedConversation);

    } catch (error) {
        console.log(error,'ERROR_CONVERSATION_DELETE');
        return new NextResponse('Internal Error',{status:500});
    }
}