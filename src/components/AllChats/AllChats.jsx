import React from "react";
import ChatsAvtar from "../SmallComponents/ChatsAvtar";

const AllChats = () => {
  return (
    <div className="h-full p-2 flex flex-col custom_scroll_bar w-52">
      <div className="font-semibold text-white mb-2">All Chats</div>
      {/* Chats */}
      {/* <div className="custom_scroll_bar"> */}
      <div className="flex-grow bg-white overflow-x-hidden overflow-auto rounded-md">
        <div className="flex flex-col  ">
          {/* {Array(12)
            .fill()
            .map((_, index) => (
              <div>
                <ChatsAvtar key={index} />
                <hr />
              </div>
            ))} */}
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
      {/* </div> */}

      {/* Chats Ends */}
    </div>
  );
};

export default AllChats;
