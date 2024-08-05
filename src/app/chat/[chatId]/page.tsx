import ChatComponent from '@/components/ChatComponent'
import ChatSidebar from '@/components/ChatSidebar'
import PDFViewer from '@/components/PDFViewer'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { checkSubscription } from '@/lib/subscription'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import HamburgerMenu from '@/components/HamburgerMenu'


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
    const isPro = await checkSubscription()
  return (
    <div className='max-w-screen overflow-scroll'>
        <div className="flex md:flex-row flex-col max-w-screen overflow-scroll">
                
            {/* Chats Sidebar  */}
            <div className="lg:flex-[1
            ] max-x-xs hidden lg:flex">
                <ChatSidebar chats={_chats} chatsId={parseInt(chatId)} isPro={isPro}/>
            </div>

            {/* PDF Viewer  */}
            <div className="lg:flex-[5] md:flex-1 h-[65vh] sm:h-screen md:max-h-screen p-4 overflow-scroll">
                <HamburgerMenu chats={_chats} chatsId={parseInt(chatId)} isPro={isPro}/>
                <PDFViewer pdfUrl={currentChat?.pdfUrl || ''} />
            </div>
            
            {/* Chats Panel  */}
            <div className="lg:flex-[3] md:flex-1 border-l  border-l-slate-200">
              <ChatComponent chatId={parseInt(chatId)}/>
            </div>
        </div>
    </div>
  )
}

export default ChatPage