"use client";
import React from "react";
import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";

type Props = {};

const ChatComponent = (props: Props) => {
  const {input, handleInputChange, handleSubmit, messages} = useChat();

  return (
    <div className="relative max-h-screen overflow-scroll">
      {/* header  */}
      <div className="sticky top-0 inset-x-0 px-2 py-4 bg-white h-fit">
        <h1 className="font-bold text-xl">Chat</h1>
      </div>

      {/* message list   */}
        <MessageList messages={messages}/>

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
