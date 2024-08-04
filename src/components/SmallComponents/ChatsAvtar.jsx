import React from "react";
import { contextData } from "../../context/Context";
import { getSender } from "../../chatLoggics/chatLoggics";

const ChatsAvtar = ({ data }) => {
  const { user, selectedChat } = contextData();
  const sender = getSender(user, data.users);

  return (
    <div
      className={`flex md:w-full items-center gap-2 cursor-pointer md:p-3 p-3 relative dark:text-slate-50 ${
        selectedChat === data ? "bg-blue-600 text-white" : ""
      }`}
    >
      <img
        className="md:w-8 w-8 md:h-8  h-8 rounded-full bg-white drop-shadow-lg "
        src={!data.isGroupChat ? sender.pic : data.groupPic}
      />
      <div className="flex flex-col ">
        <div className=" text-[18px] flex items-center justify-between">
          {!data.isGroupChat ? sender.name : data.chatName}
          {/* <span className="text-[12px] ">9:00</span> */}
        </div>
        <div className="text-[12px] font-light"> Latest Message .........</div>
      </div>
    </div>
  );
};

export default ChatsAvtar;
