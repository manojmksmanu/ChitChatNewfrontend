import React from "react";
import AllMessages from "./AllMessages";
import { BsSendFill } from "react-icons/bs";
const Mid = () => {
  return (
    <div className="bg-white dark:bg-[#001329] w-full h-full rounded flex flex-col">
      <div className="flex-grow">
        <AllMessages />
      </div>
      <div className="w-full p-2 flex item center gap-2">
        <input
          placeholder="Enter Message Here "
          className="w-full border-blue-700 rounded-sm border pl-2 text-slate-700 dark:bg-[#001329]  dark:text-slate-50"
        />
        <div className="text-blue-700 drop-shadow-md dark:text-blue-700  bg-white rounded-sm flex items-center justify-center w-8 cursor-pointer">
          <BsSendFill />
        </div>
      </div>
    </div>
  );
};

export default Mid;
