import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { MdGroupAdd } from "react-icons/md";
import Modal from "react-modal";
import AllChats from "../AllChats/AllChats";
import FindChats from "../FindChats/FindChats";
import CreateGroup from "../CreateGroupModal/CreateGroup";
import { contextData } from "../../context/Context";

Modal.setAppElement("#root");

const Chats = () => {
  const { selectedChat, switchTab } = contextData();
  const [isFindChatsOpen, setIsFindChatsOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  return (
    <motion.div
      className={`md:w-80 relative   h-full bg-white dark:bg-gray-900 shadow-xl rounded-lg transition-all duration-300 
        ${selectedChat ? "hidden md:block" : "block"}
      `}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Action Buttons */}
      <div className="absolute z-20 space-y-4 bottom-6 right-6">
        {switchTab === "allchats" && (
          <motion.button
            onClick={() => setIsFindChatsOpen(true)}
            // Animation settings
            animate={{
              scale: [0.9, 1.4, 0.9], // Pulsing effect
              boxShadow: [
                "0 0 0 0 rgba(99, 102, 241, 0)",
                "0 0 20px 4px rgba(99, 102, 241, 0.4)",
                "0 0 0 0 rgba(99, 102, 241, 0)",
              ],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.2,
              rotate: 15,
              boxShadow: "0 0 25px 6px rgba(147, 51, 234, 0.8)",
            }}
            whileTap={{ scale: 0.9 }}
            className="p-3 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <BiSolidMessageSquareAdd className="w-6 h-6" />
          </motion.button>
        )}
        {switchTab === "groups" && (
          <motion.button
            onClick={() => setIsCreateGroupOpen(true)}
            // Animation settings
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0 0 rgba(99, 102, 241, 0)",
                "0 0 20px 4px rgba(99, 102, 241, 0.7)",
                "0 0 0 0 rgba(99, 102, 241, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.2,
              rotate: 15,
              boxShadow: "0 0 25px 6px rgba(147, 51, 234, 0.8)",
            }}
            whileTap={{ scale: 0.9 }}
            className="p-3 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <MdGroupAdd className="w-6 h-6" />
          </motion.button>
        )}
      </div>

      {/* Chats Content */}
      <AllChats />

      {/* Modals */}
      <Modal
        isOpen={isFindChatsOpen}
        onRequestClose={() => setIsFindChatsOpen(false)}
        className="w-full max-w-lg p-8 mx-4 bg-white shadow-2xl dark:bg-gray-800 rounded-2xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
        style={{ overlay: { zIndex: 1000 } }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <FindChats setToggleFindChats={setIsFindChatsOpen} />
        </motion.div>
      </Modal>

      <Modal
        isOpen={isCreateGroupOpen}
        onRequestClose={() => setIsCreateGroupOpen(false)}
        className="w-full max-w-lg p-8 mx-4 bg-white shadow-2xl dark:bg-gray-800 rounded-2xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
        style={{ overlay: { zIndex: 1000 } }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <CreateGroup setToggleFindChats={setIsCreateGroupOpen} />
        </motion.div>
      </Modal>
    </motion.div>
  );
};

export default Chats;
