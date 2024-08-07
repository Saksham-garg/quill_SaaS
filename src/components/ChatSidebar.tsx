"use client"

import React, { useState } from 'react'
import { DrizzleChats } from '@/lib/db/schema'
import Link from 'next/link'
import { Button } from './ui/button'
import { MessageCircle, PlusCircle, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import axios from 'axios'
import toast from 'react-hot-toast'
import SubscriptionButton from './ui/SubscriptionButton'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose
  } from "./dialog"
import { useMutation } from '@tanstack/react-query'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { chats } from "@/lib/db/schema";
import { useRouter } from 'next/navigation'

type Props = {
    chats:DrizzleChats[],
    chatsId: number,
    isPro: boolean
}


const ChatSidebar = ({chats:Chats,chatsId,isPro}: Props) => {
    
    const router = useRouter()
    const { userId } = auth()
    let firstChat;
    if(userId){
        firstChat = await db.select().from(chats).where(eq(chats.userId,userId))
        if(firstChat){
            firstChat = firstChat[0]
        }
    }
    }
    const { mutate } = useMutation({
        mutationFn: async({chatId}:{chatId:number}) => {
            try {
                const response = await axios.delete(`/api/delete-chat/${chatId}`)
                return response.data
            } catch (error:any) {
                toast.error(error.response)
            }
        }
    })

    const deleteChat = (chat:{chatId:number,firstChat:number,router:AppRouterInstance}) => {
        mutate(chat,
            {
                onError:(err) => {
                    console.log("err",err)
                    toast.error(err.message)
                },
                onSuccess:() => {
                    toast.success("Chats created successfully.")
                    chat.router.push(`/chat/${chat.firstChat?.id}`)
                }
            }
            )
    }
    
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
                    return <div className={cn("rounded-lg p-3 text-slate-300 flex justify-between items-center gap-1",{
                        "bg-blue-800 text-white":chat.id == chatsId,
                        "hover:text-white":chat.id !== chatsId
                    })}>
                            <Link  key={chat.id} href={`/chat/${chat.id}`}>
                                <div className={cn("rounded-lg text-slate-300 flex items-center")}>
                                    <MessageCircle className='mr-2' />
                                    <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>
                                        {chat.pdfName}
                                    </p>
                                </div>
                            </Link>
                            <Dialog>
                                <DialogTrigger>
                                        <Trash2 className='cursor-pointer'/>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                       <p className='mt-3'>
                                       This action cannot be undone. This will permanently delete <span className='font-bold'>{chat.pdfName} </span> PDF data, chats and remove this data from our servers.
                                       </p>
                                    </DialogDescription>
                                    </DialogHeader>
                                       <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">Cancel</Button>
                                        </DialogClose>
                                            <Button type="submit" onSubmit={() => deleteChat(chat.id)}>Delete</Button>
                                        </DialogFooter>
                                </DialogContent>
                            </Dialog>
                    </div>
                    
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