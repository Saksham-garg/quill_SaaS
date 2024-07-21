"use client";
import React, { useEffect } from "react";
import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";

type Props = {
  chatId:number
};

const ChatComponent = ({chatId}: Props) => {
  const {input, handleInputChange, handleSubmit, messages} = useChat({
    body:{
      chatId
    }
  });

  useEffect(() => {
    const messageContainer = document.getElementById('message-container')
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages])

  return (
    <div className="relative max-h-screen overflow-scroll" id="message-container">
      {/* header  */}
      <div className="sticky top-0 inset-x-0 px-2 py-4 bg-white h-fit">
        <h1 className="font-bold text-xl">Chat</h1>
      </div>

      {/* message list   */}
        <MessageList messages={messages} />

      <form
        className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white"
        onSubmit={handleSubmit}
      >
        <div className="flex">
            <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full"
            />
            <Button className="bg-blue-600 ml-2" >
                <Send className="h-4 w-4"/>
            </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
