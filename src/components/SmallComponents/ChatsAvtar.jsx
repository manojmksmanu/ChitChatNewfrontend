import React from "react";
import { contextData } from "../../context/Context";
import { getSender } from "../../chatLoggics/chatLoggics";
import { motion } from "framer-motion";
import { format, isToday, isYesterday } from "date-fns";
import NoImage from "../../assets/no-image.png";

const ChatsAvtar = ({ data }) => {
  const { user } = contextData();
  const sender = getSender(user, data.users);
  const [isOnline] = React.useState(true); // Mock state; replace with socket later

  // Format the latest message time and date
  const messageTime = data.latestMessage
    ? format(new Date(data.latestMessage.createdAt), "h:mm a")
    : "";

  // Conditional date formatting
  const messageDate = data.latestMessage
    ? (() => {
        const date = new Date(data.latestMessage.createdAt);
        if (isToday(date)) return "Today";
        if (isYesterday(date)) return "Yesterday";
        return format(date, "MMM d, yyyy");
      })()
    : "";

  return (
    <motion.div
      className="flex items-center gap-3 p-3 transition-all duration-300 rounded-lg shadow-md cursor-pointer md:p-4"
      whileHover={{ scale: 1.02 }} // Only scales the card, not the ring
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

        {isOnline && (
          <motion.div
            className="absolute rounded-full w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-green-400 via-teal-500 to-green-400 opacity-70"
            initial={{ rotate: 0, scale: 1, opacity: 0.7 }} // Start immediately
            animate={{
              rotate: 360,
              scale: [0.5, 1, 0.5], // Pulsing effect
              opacity: [0.7, 0.9, 0.7], // Glow effect
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        )}
        {isOnline && (
          <span className="absolute bottom-0 right-0 z-10 w-3 h-3 bg-green-500 border-2 border-white rounded-full md:w-4 md:h-4 dark:border-gray-800" />
        )}
      </div>

      {/* Chat Info */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-800 truncate md:text-lg dark:text-gray-100">
            {!data.isGroupChat ? sender?.name : data.chatName}
          </h3>
          {data.latestMessage && (
            <span className="text-xs font-medium text-gray-500 md:text-sm dark:text-gray-400 whitespace-nowrap">
              {messageTime}
            </span>
          )}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          {data.latestMessage ? (
            <div className="flex flex-col">
              <p className="text-[13px] md:text-sm font-light truncate">
                <span className="font-medium">
                  {data.latestMessage.sender.name === user.name
                    ? "You"
                    : data.latestMessage.sender.name}
                </span>
                :{" "}
                {data.latestMessage.content.length > 25
                  ? data.latestMessage.content.substring(0, 20) + "..."
                  : data.latestMessage.content}
              </p>
              <span className="text-xs text-gray-400 dark:text-gray-400 mt-0.5">
                {messageDate}
              </span>
            </div>
          ) : (
            <span className="text-xs italic text-gray-400 dark:text-gray-500">
              No messages yet
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatsAvtar;
