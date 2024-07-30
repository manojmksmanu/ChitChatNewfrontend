import React from "react";
import ChatsAvtar from "../SmallComponents/ChatsAvtar";

const AllChats = () => {
  return (
    <div className="h-full p-1 flex flex-col custom_scroll_bar w-52 relative">
      <div className="font-semibold text-white mb-2">All Chats</div>
      {/* Chats */}
      <div className="flex-grow bg-white overflow-x-hidden overflow-auto rounded-md">
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
