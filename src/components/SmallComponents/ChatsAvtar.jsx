import React from "react";
import { contextData } from "../../context/Context";
import { getSender } from "../../chatLoggics/chatLoggics";

const ChatsAvtar = ({ data }) => {
  const { user } = contextData();
  const sender = getSender(user, data.users);
  return (
    <div
      className={`flex md:w-full items-center gap-2 cursor-pointer md:p-3 p-3 relative dark:text-slate-50 `}
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
        <div className="text-[12px] font-light">
          {" "}
          <div className="flex flex-col ">
            {/* <b>{!data.isGroupChat ? sender?.name : data.chatName}</b> */}
            {data.latestMessage && (
              <div className=" flex flex-wrap text-wrap text-[14px]">
                {data.latestMessage.sender.name === user.name
                  ? "You"
                  : data.latestMessage.sender.name}{" "}
                :{" "}
                {data.latestMessage.content.length > 20
                  ? data.latestMessage.content.substring(0, 15) + "..."
                  : data.latestMessage.content}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsAvtar;
