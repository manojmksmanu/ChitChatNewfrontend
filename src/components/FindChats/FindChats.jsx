import React from "react";
import FindUserAvtar from "../SmallComponents/FindUserAvtar";
import { CiSearch } from "react-icons/ci";

const FindChats = () => {
  return (
    <div className="h-full p-1 flex flex-col custom_scroll_bar">
      <div className="font-semibold text-slate-600 dark:text-slate-50  mb-3">
        Add Users
      </div>

      <div className="w-full mb-2 relative flex items-center">
        <CiSearch className="absolute ml-1 text-slate-500 dark:text-slate-50 " />
        <input
          className="w-full rounded dark:bg-[#001329] dark:text-slate-50  placeholder:text-xs flex  pl-6 pb-1 focus:no-underline focus:border-none"
          placeholder="Search Users"
        />
      </div>

      {/* Chats */}
      <div className="flex-grow bg-white dark:bg-[#001329] overflow-x-hidden overflow-auto rounded-md">
        <div className="flex flex-col ">
          <FindUserAvtar />
        </div>
      </div>
      {/* Chats Ends */}
    </div>
  );
};

export default FindChats;
