'use client';
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { assets } from "@/assets/assets";
import Sidebar from "@/components/Sidebar";
import PromptBox from "@/components/PromptBox";
import Message from "@/components/Message";

export default function Home() {

  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div>
      <div className="flex h-screen">

        {/* Sidebar */}

        <Sidebar expand={expand} setExpand={setExpand}></Sidebar>

        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white realtive">
          <div className="md:hiddend absolute top-6 flex items-center justify-between w-full px-4">
            <Image onClick={() => (expand ? setExapnd(false) : setExapnd(true))}
              className="rotate-180" src={assets.menu_icon} alt="" />
            <Image className="rotate-180" src={assets.chat_icon} alt="" />
          </div>

          {messages.length === 0 ? (
            <>
              <div className="flex items-center gp-3">
                <Image src={assets.logo_icon} alt="" className="h-16"></Image>
                <p className="text-2xl font medium">Hi, I'm Deepseek</p>
              </div>
              <p className="text-sm mt-2">
                How can I help you today?
              </p>
            </>
          ) :
            (<div>
              <Message role="user" content="what is nextjs" />
            </div>)
          }

          {/* Chat Messages */}
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />

        </div>
      </div>
    </div>
  );
}
