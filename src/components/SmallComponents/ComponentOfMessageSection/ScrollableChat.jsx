import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { motion } from "framer-motion";
import { format, isSameDay } from "date-fns";
import { contextData } from "../../../context/Context";

const ScrollableChat = ({ messages }) => {
  const { user, selectedChat } = contextData();

  return (
    <div className="flex flex-col h-full overflow-y-auto ">
      <ScrollableFeed
        className="flex flex-col p-1 custom-scrollbar"
        forceScroll={true} // Ensures scrolling to the latest message
      >
        {messages &&
          messages.map((m, i) => {
            const messageTime = format(new Date(m.createdAt), "p");
            const messageDate = format(new Date(m.createdAt), "MMMM d, yyyy");

            const showDateSeparator =
              i === 0 ||
              !isSameDay(
                new Date(messages[i - 1].createdAt),
                new Date(m.createdAt)
              );

            return (
              <React.Fragment key={i}>
                {showDateSeparator && (
                  <div className="flex justify-center w-full my-2">
                    <span className="px-3 py-1 text-xs text-gray-700 bg-gray-200 rounded-full">
                      {messageDate}
                    </span>
                  </div>
                )}
                <div
                  className={`max-w-full flex mt-1 gap-1 ${
                    m.sender._id === user._id ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {selectedChat.isGroupChat && m.sender._id !== user._id && (
                    <img
                      className="w-5 h-5 bg-white rounded-full drop-shadow-md"
                      src={m.sender.pic}
                      alt="Sender"
                    />
                  )}

                  <motion.div
                    className={`md:max-w-72 sm:max-w-44 max-w-28 ${
                      m.sender._id === user._id
                        ? "bg-white text-slate-900"
                        : "bg-blue-700 text-slate-100"
                    } shadow-md p-1 rounded-sm text-xs break-words`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {m.content}
                    <span className="block text-gray-400 text-[10px] mt-1">
                      {messageTime}
                    </span>
                  </motion.div>
                </div>
              </React.Fragment>
            );
          })}
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChat;

// Custom Scrollbar CSS (Add to your global CSS file, e.g., index.css)
const customScrollbarCSS = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-track {
    background: #2d3748;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4f46e5;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #7c3aed;
  }
`;
