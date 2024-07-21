import ChatComponent from '@/components/ChatComponent'
import ChatSidebar from '@/components/ChatSidebar'
import PDFViewer from '@/components/PDFViewer'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
      chatId: string;
    };
  };

const ChatPage = async ({params:{chatId}}: Props) => {
    const { userId } = await auth()
    
    if(!userId){
       return redirect('/sign-in')
    }

    const _chats = await db.select().from(chats).where(eq(chats.userId,userId))

    if(!_chats){
        return redirect('/')
    }

    if(!_chats.find((chat) => chat.id === parseInt(chatId))){
        return redirect('/')
    }

    const currentChat = _chats.find((chat) => chat.id === parseInt(chatId))
  return (
    <div className='max-w-screen overflow-scroll'>
        <div className="flex max-w-screen overflow-scroll">
                
            {/* Chats Sidebar  */}
            <div className="flex-[1] max-x-xs">
                <ChatSidebar chats={_chats} chatsId={parseInt(chatId)} />
            </div>

            {/* PDF Viewer  */}
            <div className="flex-[5] max-h-screen p-4 overflow-scroll">
                <PDFViewer pdfUrl={currentChat?.pdfUrl || ''} />
            </div>
            
            {/* Chats Panel  */}
            <div className="flex-[3] border-l border-l-slate-200">
              <ChatComponent chatId={chatId}/>
            </div>
        </div>
    </div>
  )
}

export default ChatPage