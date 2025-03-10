import React, { useEffect, useState } from "react";
import ChatsAvtar from "../SmallComponents/ChatsAvtar";
import { contextData } from "../../context/Context";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BeatLoader } from "react-spinners";

const AllChats = () => {
  const {
    baseurl,
    chats,
    setChats,
    user,
    selectedChat,
    setSelectedChat,
    switchTab,
    fetchChatsAgain,
    setFetchChatsAgain,
  } = contextData();
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchChats = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${baseurl}api/chat/chats`, config);
      setChats(data);
      setFetchChatsAgain(false); // Reset after successful fetch
    } catch (error) {
      toast.error("Failed to load chats");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Fetching chats...");
      fetchChats();
    }
  }, [fetchChatsAgain, user]); // Added user as dependency

  return (
    <div className="relative flex flex-col w-full h-full p-1 md:p-1 custom_scroll_bar ">
      <div className="flex flex-col px-4 py-3 m-2 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {switchTab === "allchats" && "All Conversations"}
          {switchTab === "people" && "Direct Messages"}
          {switchTab === "groups" && "Group Chats"}
        </h2>
      </div>

      <div className="flex-grow bg-white dark:bg-[#001329] overflow-x-hidden overflow-auto rounded-md m-2">
        {loading && chats?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <BeatLoader color="#4f46e5" size={12} />
          </div>
        ) : chats ? (
          <AnimatePresence>
            {switchTab === "allchats" &&
              chats?.map((chat) => (
                <motion.div
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  className={
                    selectedChat && selectedChat._id === chat._id
                      ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg"
                      : "cursor-pointer  hover:bg-blue-500 hover:text-white"
                  }
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  layout
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.01}}
                  whileTap={{ scale: 0.98 }}
                >
                  <ChatsAvtar data={chat} />
                </motion.div>
              ))}
            {switchTab === "people" &&
              chats
                .filter((chat) => chat.isGroupChat === false) // Add the appropriate filter condition here
                .map((chat) => (
                  <motion.div
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    className={
                      selectedChat && selectedChat._id === chat._id
                        ? "bg-blue-700  text-white cursor-pointer "
                        : "cursor-pointer  hover:bg-blue-500 hover:text-white"
                    }
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    layout
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ChatsAvtar data={chat} />
                  </motion.div>
                ))}
            {switchTab === "groups" &&
              chats
                .filter((chat) => chat.isGroupChat === true)
                .map((chat) => (
                  <motion.div
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    className={
                      selectedChat && selectedChat._id === chat._id
                        ? "bg-blue-700  text-white cursor-pointer "
                        : "cursor-pointer  hover:bg-blue-500 hover:text-white"
                    }
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    layout
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.01}}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ChatsAvtar data={chat} />
                  </motion.div>
                ))}
            {/* Similar mapping for "people" and "groups" */}
          </AnimatePresence>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No chats available
          </div>
        )}
      </div>
    </div>
  );
};

export default AllChats;
