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
import { useRouter } from 'next/navigation'

type Props = {
    chats: DrizzleChats[],
    chatsId: number,
    isPro: boolean,
    userId: string
}


const ChatSidebar = ({ chats: Chats, chatsId, isPro, userId }: Props) => {
    const [open, setOpen] = useState(false);
    const [deleteChatDetails, setDeleteChatDetails] = useState<DrizzleChats | null>(null)
    const router = useRouter()

    let firstChat: any;
    console.log(userId)
    if (userId) {
        firstChat = Chats
        if (firstChat) {
            firstChat = firstChat[0]
        }
    }

    const { mutate } = useMutation({
        mutationFn: async ({ chat, firstChat }: { chat: DrizzleChats | null, firstChat: object }) => {
            try {
                console.log("chatId", chat)
                const response = await axios.delete(`/api/delete-chat/${chat?.id}`, {
                    data: {
                        "fileKey": chat?.fileKey,
                        "fileName": chat?.pdfName
                    }
                })
                return response.data
            } catch (error: any) {
                toast.error(error.response)
            }
        }
    })

    const deleteChat = (chat: { chat: DrizzleChats | null }) => {
        try {
            setDeleteChatDetails(chat.chat)
            mutate({ chat: deleteChatDetails, firstChat },
                {
                    onError: (err) => {
                        console.log("err", err)
                        // toast.error(err.message)
                    },
                    onSuccess: () => {
                        toast.success("Chats created successfully.")
                        // chat.router.push(`/chat/${chat.firstChat?.id}`)
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='w-full h-screen p-4 text-gray-200 bg-gray-900'>
                <Link href="/">
                    <Button className='w-full border-dashed border-white border'>
                        <PlusCircle className='mr-2 w-4 h-4' />
                        New Chat
                    </Button>
                </Link>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription asChild>
                                <p className='mt-3'>
                                    This action cannot be undone. This will permanently delete <span className='font-bold'>{deleteChatDetails?.pdfName} </span> PDF data, chats and remove this data from our servers.
                                </p>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogTrigger>

                        </DialogTrigger>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" onClick={() => deleteChat({ chat: deleteChatDetails })}>Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <div className="flex max-h-screen overflow-scroll pb-20 flex-col gap-2 mt-4">
                    {
                        Chats.map((chat) => {
                            return <div className={cn("rounded-lg p-3 text-slate-300 flex justify-between items-center gap-1", {
                                "bg-blue-800 text-white": chat.id == chatsId,
                                "hover:text-white": chat.id !== chatsId
                            })} key={chat.id}>
                                <Link href={`/chat/${chat.id}`}>
                                    <div className="rounded-lg text-slate-300 flex items-center">
                                        <MessageCircle className='mr-2' />
                                        <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>
                                            {chat.pdfName}
                                        </p>
                                    </div>
                                </Link>
                                <Trash2 className='cursor-pointer' onClick={() => {
                                    setOpen(true)
                                    setDeleteChatDetails(chat)
                                }} />

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
        </>
    )
}

export default ChatSidebar