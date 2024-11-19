import prisma from "@/app/libs/prismadb"
/* eslint-disable */
const getMessages = async (conversationid:string) => {
     try {
        const messages = await prisma.message.findMany({
            where:{
                conversationId:conversationid
            },
            include:{
                sender:true,
                seen:true
            },
            orderBy:{
                createdAt:'asc'
            }
        })
        return messages
     } catch (error:any) {
        return [];
     }
}
export default getMessages;