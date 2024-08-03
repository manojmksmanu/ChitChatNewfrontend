import React from "react";
import ChatsAvtar from "../SmallComponents/ChatsAvtar";

const AllChats = () => {
  return (
    <div className="h-full md:p-1 p-1 flex flex-col custom_scroll_bar  w-full  relative">
      <div className="font-semibold text-slate-600 dark:text-slate-100 mb-3">All Chats</div>
      {/* Chats */}
      <div className="flex-grow bg-white dark:bg-[#001329]  overflow-x-hidden overflow-auto rounded-md">
        <div className="flex flex-col ">
          <ChatsAvtar />
          <ChatsAvtar selected={"style"} />
          <ChatsAvtar />
          <ChatsAvtar />
          <ChatsAvtar />
          <ChatsAvtar />
          <ChatsAvtar />
          <ChatsAvtar />
          <ChatsAvtar />
          <ChatsAvtar />
          <ChatsAvtar />
          <ChatsAvtar />
        </div>
      </div>
      {/* Chats Ends */}
    </div>
  );
};

export default AllChats;
