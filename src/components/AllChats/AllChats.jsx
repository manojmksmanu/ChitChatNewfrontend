import React, { useEffect } from "react";
import ChatsAvtar from "../SmallComponents/ChatsAvtar";
import { contextData } from "../../context/Context";
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion";
import FrontPage from "../PageLoading/FrontPage";
import Chats from "../Chats/Chats";
import { BeatLoader } from "react-spinners";

const AllChats = () => {
  const { baseurl } = contextData();
  const {
    chats,
    setChats,
    user,
    selectedChat,
    setSelectedChat,
    switchTab,
    fetchChatsAgain,
  } = contextData();
  const fetchChats = async () => {
    if (!user) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${baseurl}api/chat/chats`, config);
      setChats(data);
    } catch (error) {
      toast.error("Failed to Load the chats");
    }
  };
  useEffect(() => {
    console.log('fetching')
    fetchChats();
  }, [fetchChatsAgain]);
  return (
    <div className="relative flex flex-col w-full h-full p-1 md:p-1 custom_scroll_bar">
      <div className="flex flex-col px-4 py-3 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {switchTab === "allchats" && "All Conversations"}
          {switchTab === "people" && "Direct Messages"}
          {switchTab === "groups" && "Group Chats"}
        </h2>
      </div>

      {/* Chats */}
      <div className="flex-grow bg-white dark:bg-[#001329] overflow-x-hidden overflow-auto rounded-md">
        <div className="flex flex-col ">
          {chats && (
            <AnimatePresence>
              {switchTab === "allchats" &&
                chats?.map((chat) => (
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
                    whileHover={{ scale: 1.02 }}
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
                      whileHover={{ scale: 1.02 }}
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ChatsAvtar data={chat} />
                    </motion.div>
                  ))}
            </AnimatePresence>
          )}
          {!chats && (
            <div>
              <div className="logo h-[calc(100vh-200px)] flex items-center justify-center text-blue-600 dark:text-white font-black text-4xl">
                <BeatLoader color="#4f46e5" size={12} />
                <motion.div className="c c1">C</motion.div>
                <motion.div
                  className="c c2"
                  animate={{ rotate: [-20, 10, -20] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  C
                </motion.div>
                <BeatLoader color="#4f46e5" size={12} />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Chats Ends */}
    </div>
  );
};

export default AllChats;
