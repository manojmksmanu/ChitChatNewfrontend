import React, { useEffect, useState } from "react";
import { contextData } from "../../context/Context";
import { getSender } from "../../chatLoggics/chatLoggics";
import { motion } from "framer-motion";
import { format, isToday, isYesterday } from "date-fns";
import NoImage from "../../assets/no-image.png";
import { useSocket } from "../../context/SocketContext";

const ChatsAvtar = ({ data }) => {
  const { user, selectedChat } = contextData();
  const { onlineUsers } = useSocket();
  const [isOnline, setIsOnline] = useState(false);

  // Early return if data is not provided
  if (!data) {
    return null;
  }

  const sender = getSender(user, data.users);

  useEffect(() => {
    if (!data.isGroupChat && sender) {
      setIsOnline(onlineUsers.has(sender._id));
    }
  }, [onlineUsers, sender]);

  // Format the latest message time and date with null checks
  const messageTime = data.latestMessage
    ? format(new Date(data.latestMessage.createdAt), "h:mm a")
    : "";

  const messageDate = data.latestMessage
    ? (() => {
        const date = new Date(data.latestMessage.createdAt);
        if (isToday(date)) return "Today";
        if (isYesterday(date)) return "Yesterday";
        return format(date, "MMM d, yyyy");
      })()
    : "";

  const isSelected = selectedChat?._id === data._id;

  return (
    <motion.div
      className={`flex items-center gap-3 p-3 transition-all duration-300 rounded-lg shadow-md cursor-pointer md:p-4 `}
      transition={{ duration: 0.2 }}
    >
      {/* Avatar with Online Status */}
      <div className="relative flex items-center justify-center">
        <img
          className="z-10 object-cover w-10 h-10 border-2 border-gray-200 rounded-full shadow-sm md:w-12 md:h-12 dark:border-gray-600"
          src={
            !data.isGroupChat
              ? sender?.pic || NoImage
              : data.groupPic || NoImage
          }
          alt="Chat Avatar"
        />

        {!data.isGroupChat && isOnline && (
          <motion.div
            className="absolute rounded-full w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-green-400 via-teal-500 to-green-400 opacity-70"
            initial={{ rotate: 0, scale: 1, opacity: 0.7 }}
            animate={{
              rotate: 360,
              scale: [0.5, 1, 0.5],
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        )}
        {!data.isGroupChat && isOnline && (
          <span className="absolute bottom-0 right-0 z-10 w-3 h-3 bg-green-500 border-2 border-white rounded-full md:w-4 md:h-4 dark:border-gray-800" />
        )}
      </div>

      {/* Chat Info */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="flex items-center justify-between">
          <h3
            className={`text-base font-semibold truncate md:text-lg ${
              isSelected ? "text-white" : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {!data.isGroupChat
              ? sender?.name || "Unknown"
              : data.chatName || "Unnamed Group"}
          </h3>
          {data.latestMessage && (
            <span
              className={`text-xs font-medium md:text-sm whitespace-nowrap ${
                isSelected
                  ? "text-gray-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {messageTime}
            </span>
          )}
        </div>

        <div
          className={`text-sm ${
            isSelected ? "text-white" : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {data.latestMessage ? (
            <div className="flex flex-col">
              <p className="text-[13px] md:text-sm font-light truncate">
                <span className="font-medium">
                  {data.latestMessage.sender?.name === user?.name
                    ? "You"
                    : data.latestMessage.sender?.name || "Unknown"}
                </span>
                :{" "}
                {data.latestMessage.content?.length > 25
                  ? data.latestMessage.content.substring(0, 20) + "..."
                  : data.latestMessage.content || ""}
              </p>
              <span
                className={`text-xs mt-0.5 ${
                  isSelected
                    ? "text-gray-300"
                    : "text-gray-400 dark:text-gray-400"
                }`}
              >
                {messageDate}
              </span>
            </div>
          ) : (
            <span
              className={`text-xs italic ${
                isSelected
                  ? "text-gray-300"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              No messages yet
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatsAvtar;
