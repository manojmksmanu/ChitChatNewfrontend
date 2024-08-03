import React, { useState } from "react";
import AllMessages from "./AllMessages";
import { BsSendFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";

const Mid = () => {
  const [inputValue, setInputValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  function handleEmoji(e) {
    setInputValue((prev) => prev + e.emoji);
  }

  return (
    <div className="bg-white dark:bg-[#001329] w-full h-full rounded flex flex-col">
      <div className="flex-grow">
        <AllMessages />
      </div>
      <div className="w-full p-2 flex items-center gap-2 relative">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter Message Here"
          className="w-full border-blue-700 rounded-sm border pl-2 text-slate-700 dark:bg-[#001329] dark:text-slate-50"
        />
        <div
          onClick={() => setShowPicker(!showPicker)}
          className="cursor-pointer text-slate-700 dark:text-slate-50"
        >
          <MdEmojiEmotions />
        </div>
        {showPicker && (
          <div className="absolute bottom-14 right-10 z-10">
            <EmojiPicker
              onEmojiClick={handleEmoji}
              className=" max-w-[280px] xs:max-w-[300px] sm:max-w-full max-h-[400px] xs:max-h-full"
              open={open}
            />
          </div>
        )}
        <div className="text-blue-700 drop-shadow-md dark:text-blue-700 bg-white rounded-sm flex items-center justify-center w-8 cursor-pointer">
          <BsSendFill />
        </div>
      </div>
    </div>
  );
};

export default Mid;
