import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const { chatId } = await req.json()
        const _messages = await db.select().from(messages).where(eq(messages.chatId,chatId))
        return _messages
    } catch (error) {
        return NextResponse.json({
            error:error
        },{status:500})
    }
} 