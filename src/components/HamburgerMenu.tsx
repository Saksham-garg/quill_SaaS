"use client"
import React, { useState } from 'react'
import { Button } from './ui/button';
import Link from 'next/link'
import { AlignJustify,PlusCircle } from "lucide-react";
import ChatSidebar from './ChatSidebar';
import { DrizzleChats } from '@/lib/db/schema'

type Props = {
    chats:DrizzleChats[],
    chatsId: number,
    isPro: boolean,
    userId:string
}

const HamburgerMenu = ({chats,chatsId,isPro,userId}:Props) => {
    const [ showMenu , setShowMenu ] = useState(false)
  return (
    <>
    <div className='mb-3 relative block lg:hidden'>
        <div className="flex gap-4 items-center">
            <div className="cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                { !showMenu && <AlignJustify />}  
            </div>
            <Link href="/" className='w-full'>
                <Button className='w-full border-white border'>
                    <PlusCircle  className='mr-2 w-4 h-4'/>
                    New Chat
                </Button>
            </Link>
        </div>
    </div>
    {
        showMenu && (
            <>
                <aside className="fixed top-0 left-0 bottom-0  max-h-[100vh] pt-16 z-40 w-full opacity-30 transform duration-300 bg-white scroll-smooth overflow-y-auto" onClick={() => setShowMenu(!showMenu)}>
                </aside>
                    <div className="fixed top-0 left-0 h-full max-w-xl z-50">
                        <ChatSidebar chats={chats} chatsId={chatsId} isPro={isPro} userId={userId}/>
                    </div>
            </>
        )
    }
    </>
  )
}

export default HamburgerMenu