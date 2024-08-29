import { db } from "@/lib/db";
import { deleteFromS3 } from "@/lib/db/delete-s3";
import { chats, messages } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function DELETE(req: Request,{params}:{params:{chatId:string}}){
    try {
        // STEP 1: Delete PDF file from S3 bucket.
        const { userId} = await auth()
        const {chatId} = params
        // console.log(params)
        // console.log(chatId)
        if(!userId){
            return NextResponse.json({message:"Unauthorized"},{status:401})
        }

        const body = await req.json()
        const { fileKey,fileName } = body

        const s3Data = await deleteFromS3(fileKey)
        console.log("S3 data",s3Data)
        // STEP 2: Delete Vectors from pinecone Db

        // STEP 3: Delete Chats data from neon DB

        const deletedChat = await db.delete(messages).where(eq(messages.chatId,parseInt(chatId))).returning()
        return NextResponse.json({
            s3Data,
            deletedChat
        },{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error:error
        },{status:500})
    }
}