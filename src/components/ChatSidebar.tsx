"use client"

import React, { useState } from 'react'
import { DrizzleChats } from '@/lib/db/schema'
import Link from 'next/link'
import { Button } from './ui/button'
import { MessageCircle, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import axios from 'axios'
import toast from 'react-hot-toast'
import SubscriptionButton from './ui/SubscriptionButton'

type Props = {
    chats:DrizzleChats[],
    chatsId: number,
    isPro: boolean
}

const ChatSidebar = ({chats,chatsId,isPro}: Props) => {

  return (
    <div className='w-full h-screen p-4 text-gray-200 bg-gray-900'>
        <Link href="/">
            <Button className='w-full border-dashed border-white border'>
                <PlusCircle  className='mr-2 w-4 h-4'/>
                New Chat
            </Button>
        </Link>
        
        <div className="flex max-h-screen overflow-scroll pb-20 flex-col gap-2 mt-4">
            {
                chats.map((chat) => {
                    return <Link  key={chat.id} href={`/chat/${chat.id}`}>
                        <div className={cn("rounded-lg p-3 text-slate-300 flex items-center",{
                            "bg-blue-800 text-white":chat.id == chatsId,
                            "hover:text-white":chat.id !== chatsId
                        })}>
                            <MessageCircle className='mr-2' />
                            <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>
                                {chat.pdfName}
                            </p>
                        </div>
                    </Link>
                })  
            }
        </div>

        <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
                <Link href="/">Home</Link>
                <Link href="/">Source</Link>
            </div>
            <SubscriptionButton isPro={isPro}></SubscriptionButton>
        </div>
    </div>
  )
}

export default ChatSidebar