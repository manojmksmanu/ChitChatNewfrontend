import React from "react";
import { CiMenuKebab } from "react-icons/ci";
const Top = () => {
  return (
    <div className="flex justify-between items-center p-2 rounded dark:text-slate-50 text-slate-700 bg-white dark:bg-[#001329]">
      <div className="flex items-center gap-3">
        <img
          className="w-8 h-8 rounded-full drop-shadow-lg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s"
        />
        <div className="flex flex-col text-xs">
          Manoj Kumar
          <span className="text-[12px] ">Typing....</span>
        </div>
      </div>

      <CiMenuKebab className="cursor-pointer" />
    </div>
  );
};

export default Top;
