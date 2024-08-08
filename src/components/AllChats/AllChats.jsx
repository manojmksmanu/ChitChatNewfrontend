import React, { useEffect } from "react";
import ChatsAvtar from "../SmallComponents/ChatsAvtar";
import { contextData } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
const AllChats = ({ toggleCreateGroup, setToggleCreateGroup }) => {
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
      const { data } = await axios.get(
        "http://localhost:5000/api/chat/chats",
        config
      );
      setChats(data);
    } catch (error) {
      toast.error("Failed to Load the chats");
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchChatsAgain]);

  // if (!chats) {
  //   return <div>Loading...</div>; // Display loading message or spinner
  // }

  return (
    <div className="h-full md:p-1 p-1 flex flex-col custom_scroll_bar w-full relative">
      <div className="font-semibold text-slate-600 dark:text-slate-100 mb-3 pl-1">
        {switchTab === "allchats" && <span>All Chats</span>}
        {switchTab === "people" && <span>All Peoples</span>}
        {switchTab === "groups" && <span>All Groups</span>}
      </div>
      {/* Chats */}
      <div className="flex-grow bg-white dark:bg-[#001329] overflow-x-hidden overflow-auto rounded-md">
        <div className="flex flex-col ">
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
        </div>
      </div>
      {/* Chats Ends */}
    </div>
  );
};

export default AllChats;
