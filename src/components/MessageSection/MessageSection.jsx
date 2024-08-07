import React, { useState } from "react";
import Top from "../SmallComponents/ComponentOfMessageSection/Top";
import AllMessages from "../SmallComponents/ComponentOfMessageSection/AllMessages";
import { contextData } from "../../context/Context";
import SelectChatAnimation from "../misc/Animation/SelectChatAnimation";
// import {selectChatAnimation} from "../misc/LottiFilesAnimation/selectChat/selectChat";

const MessageSection = () => {
  const { selectedChat } = contextData();
  return (
    <div className="w-full h-full flex flex-col">
      {/* <div className="h-[57px]">Hello</div> */}
      {selectedChat ? (
        <>
          <div className="flex-grow mt-2">
            <AllMessages />
          </div>
        </>
      ) : (
        <div
          id="your-element-selector"
          className="h-full w-full  rounded-md flex-col  flex justify-center items-center bg-slate-50 dark:bg-[#001329]"
        >
          <SelectChatAnimation />
          {/* <selectChatAnimation/> */}
          <span className="text-blue-700 dark:text-slate-100 text-xs">
            Select with Whom you want to chat{" "}
          </span>
          {/* <Vantra/> */}
        </div>
      )}
    </div>
  );
};

export default MessageSection;
