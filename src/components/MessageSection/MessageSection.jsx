import React from "react";
import Top from "../SmallComponents/ComponentOfMessageSection/Top";
import Bottom from "../SmallComponents/ComponentOfMessageSection/Bottom";

const MessageSection = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div>
        <Top />
      </div>
      <div className="flex-grow mt-2">
        <Bottom />
      </div>
    </div>
  );
};

export default MessageSection;
