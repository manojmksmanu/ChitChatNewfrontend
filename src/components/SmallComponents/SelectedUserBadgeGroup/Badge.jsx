import React from "react";
import { RxCross1 } from "react-icons/rx";
const Badge = ({ data, notshowcross }) => {
  console.log(data);
  return (
    <div className="dark:bg-slate-900  bg-slate-50 shadow-lg text-slate-800  dark:text-white p-1.5 rounded-lg flex items-center gap-2 cursor-pointer  hover:bg-slate-700 text-xs">
      <img className="w-8 h-8 rounded-full" src={data.pic} />
      {data && data.name}
      <span>{notshowcross ? "" : <RxCross1 />}</span>{" "}
    </div>
  );
};

export default Badge;
