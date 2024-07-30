import React from "react";

const ChatsAvtar = ({ selected }) => {
  return (
    <div
      className={`flex md:w-full items-center gap-2 cursor-pointer md:p-3 relative dark:text-slate-50  ${
        selected === "style" ? "bg-blue-500 text-white" : ""
      }`}
    >
      <img
        className="w-8 h-8 rounded-full bg-white drop-shadow-lg p-1"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s"
      />
      <div className="flex flex-col ">
        <div className=" text-[16px] flex items-center justify-between">
          Manoj Kumar
          {/* <span className="text-[12px] ">9:00</span> */}
        </div>
        <div className="text-[12px] font-light"> Latest Message .........</div>
      </div>
    </div>
  );
};

export default ChatsAvtar;
