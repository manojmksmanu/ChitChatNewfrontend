import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { contextData } from "../../../context/Context";
import { getSender } from "../../../chatLoggics/chatLoggics";

const Top = ({isTyping}) => {
  const { user, selectedChat } = contextData();


  // Get the sender object if it's a one-on-one chat
  const sender =
    selectedChat && !selectedChat.isGroupChat
      ? getSender(user, selectedChat.users)
      : null;

  return (
    <div className="flex justify-between items-center p-2 rounded dark:text-slate-50 text-slate-700 bg-white dark:bg-[#001329]">
      <div className="flex items-center gap-3">
        <img
          className="w-8 h-8 rounded-full drop-shadow-lg"
          src={
            selectedChat && !selectedChat.isGroupChat
              ? sender?.pic
              : selectedChat?.isGroupChat
              ? selectedChat.groupPic
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s"
          }
          alt="Chat Avatar"
        />
        <div className="flex flex-col text-xs">
          <span className="font-medium">
            {selectedChat && !selectedChat.isGroupChat
              ? sender?.name
              : selectedChat && selectedChat.isGroupChat
              ? selectedChat.chatName
              : "No Chat Selected"}
          </span>
          <span className="text-[12px]">
            {isTyping?"typing...":""}
            </span>
        </div>
      </div>
      
      <CiMenuKebab className="cursor-pointer" />
    </div>
  );
};

export default Top;
