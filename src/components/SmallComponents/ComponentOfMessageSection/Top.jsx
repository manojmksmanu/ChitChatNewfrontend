import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { contextData } from "../../../context/Context";
import { getSender } from "../../../chatLoggics/chatLoggics";
import NoImage from "../../../assets/no-image.png";

const Top = ({ isTyping, handleGroupModal }) => {
  const { user, selectedChat } = contextData();

  // Get the sender object if it's a one-on-one chat
  const sender =
    selectedChat && !selectedChat.isGroupChat
      ? getSender(user, selectedChat.users)
      : null;

  return (
    <div className="flex justify-between items-center p-2 md:p-4 rounded dark:text-slate-50 text-slate-700 bg-white dark:bg-[#001329]">
      <div className="flex items-center gap-3 md:gap-4">
        <img
          className="w-8 h-8 rounded-full md:w-12 md:h-12 lg:w-14 lg:h-14 drop-shadow-lg"
          src={
            selectedChat && !selectedChat.isGroupChat
              ? sender?.pic || NoImage
              : selectedChat?.isGroupChat
              ? selectedChat.groupPic || NoImage
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s"
          }
          alt="Chat Avatar"
        />
        <div className="flex flex-col text-xs md:text-sm lg:text-base">
          <span className="font-medium">
            {selectedChat && !selectedChat.isGroupChat
              ? sender?.name
              : selectedChat && selectedChat.isGroupChat
              ? selectedChat.chatName
              : "No Chat Selected"}
          </span>
          <span className="text-[12px] md:text-sm">
            {isTyping ? "typing..." : ""}
          </span>
        </div>
      </div>

      <CiMenuKebab
        onClick={selectedChat?.isGroupChat ? handleGroupModal : null}
        className="text-xl cursor-pointer md:text-2xl lg:text-3xl"
      />
    </div>
  );
};

export default Top;
