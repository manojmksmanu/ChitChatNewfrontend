import React from "react";

const FindUserAvtar = ({ data }) => {

  return (
    <div
      className={`flex md:w-full items-center dark:text-slate-50 text-slate-700 gap-2 cursor-pointer md:p-3 p-3 relative hover:bg-blue-500 hover:text-white`}
    >
      <img
        className="md:w-8 md:h-8 w-8 h-8 rounded-full bg-white drop-shadow-lg "
      />
      <div className="flex flex-col ">
        <div className=" text-[18px] flex items-center justify-between">
          {data.name}
          {/* <span className="text-[12px] ">9:00</span> */}
        </div>
        <div className="text-[14px] font-light">{data.email}</div>
      </div>
    </div>
  );
};

export default FindUserAvtar;
