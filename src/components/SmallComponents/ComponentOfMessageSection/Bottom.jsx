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
      <>
        <form>
          <div class=" relative flex items-center md:px-3  py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <button
              onClick={() => setShowPicker(!showPicker)}
              type="button"
              class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                />
              </svg>
            </button>
            {showPicker && (
              <div className="absolute md:bottom-14 md:right-10 right-1 bottom-10 z-10">
                <EmojiPicker
                  onEmojiClick={handleEmoji}
                  className=" max-w-[250px] xs:max-w-[300px]  sm:max-w-full max-h-[400px] xs:max-h-full"
                  open={open}
                />
              </div>
            )}
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              id="chat"
              rows="1"
              class="block md:mx-3 mx-0 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            ></textarea>
            <button
              type="submit"
              class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                class="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
            </button>
          </div>
        </form>
      </>
    
    </div>
  );
};

export default Mid;
