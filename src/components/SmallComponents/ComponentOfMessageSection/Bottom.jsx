import React from "react";
import AllMessages from "./AllMessages";

const Mid = () => {
  return (
    <div className="bg-white w-full h-full rounded flex flex-col">
      <div className="flex-grow">
        <AllMessages />
      </div>
      <div className="w-full p-2 ">
        <input
          placeholder="Enter Message Here "
          className="w-full border-blue-700 rounded-sm border pl-2"
        />
      </div>
    </div>
  );
};

export default Mid;
