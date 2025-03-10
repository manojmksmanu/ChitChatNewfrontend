import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";

import { contextData } from "../../../context/Context";
import { getSender } from "../../../chatLoggics/chatLoggics";
import NoImage from "../../../assets/no-image.png";
import { useSocket } from "../../../context/SocketContext";

const Top = ({ isTyping, handleGroupModal }) => {
  const { user, selectedChat, setSelectedChat } = contextData();
  const { onlineUsers } = useSocket();
  const [isOnline, setIsOnline] = useState(false);

  console.log(onlineUsers);

  useEffect(() => {
    if (!selectedChat.isGroupChat) {
      const sender = selectedChat.users.find((u) => u._id !== user._id);
      setIsOnline(onlineUsers.has(sender?._id));
    }
  }, [onlineUsers, selectedChat, user]);

  const sender =
    selectedChat && !selectedChat.isGroupChat
      ? getSender(user, selectedChat.users)
      : null;

  return (
    <div className="flex justify-between items-center p-3 md:p-4 rounded-lg bg-white dark:bg-[#001329] shadow-sm border-b dark:border-gray-700">
      {/* Avatar + Name + Status */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="cursor-pointer" onClick={() => setSelectedChat(null)}>
          <IoMdArrowRoundBack />
        </div>
        {/* Profile Image */}
        <div className="relative">
          <img
            className="w-10 h-10 border border-gray-300 rounded-full shadow-md md:w-12 md:h-12 lg:w-14 lg:h-14 dark:border-gray-600"
            src={
              selectedChat && !selectedChat.isGroupChat
                ? sender?.pic || NoImage
                : selectedChat?.isGroupChat
                ? selectedChat.groupPic || NoImage
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s"
            }
            alt="Chat Avatar"
          />
          {/* Online Indicator */}
          {isOnline && !selectedChat.isGroupChat && (
            <span className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-white dark:border-[#001329] rounded-full"></span>
          )}
        </div>
        {/* Name + Status */}
        <div className="flex flex-col text-sm md:text-base">
          <span className="font-semibold text-gray-900 dark:text-white">
            {selectedChat && !selectedChat.isGroupChat
              ? sender?.name
              : selectedChat?.isGroupChat
              ? selectedChat.chatName
              : "No Chat Selected"}
          </span>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {!selectedChat.isGroupChat && (isOnline ? "Online" : "Offline")}
          </span>
        </div>
      </div>

      {/* Menu Icon */}
      {selectedChat.isGroupChat && (
        <CiMenuKebab
          onClick={selectedChat?.isGroupChat ? handleGroupModal : null}
          className="text-2xl text-gray-600 transition-all cursor-pointer md:text-3xl dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        />
      )}
    </div>
  );
};

export default Top;
