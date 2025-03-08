import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { MdGroupAdd } from "react-icons/md";
import Modal from "react-modal";
import AllChats from "../AllChats/AllChats";
import FindChats from "../FindChats/FindChats";
import CreateGroup from "../CreateGroupModal/CreateGroup";
import { contextData } from "../../context/Context";

// Bind modal to app element for accessibility
Modal.setAppElement("#root");

const Chats = () => {
  const { selectedChat, switchTab } = contextData();
  const [isFindChatsOpen, setIsFindChatsOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  return (
    <div
      className={`md:w-72 w-full h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
        selectedChat ? "hidden md:block" : "block"
      }`}
    >
      {/* Action Buttons */}
      <div className="absolute z-20 flex flex-col space-y-4 bottom-4 right-4">
        {switchTab === "allchats" && (
          <motion.button
            onClick={() => setIsFindChatsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-white transition-colors bg-indigo-500 rounded-full shadow-md hover:bg-indigo-600"
          >
            <BiSolidMessageSquareAdd className="w-6 h-6" />
          </motion.button>
        )}
        {switchTab === "groups" && (
          <motion.button
            onClick={() => setIsCreateGroupOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-white transition-colors bg-indigo-500 rounded-full shadow-md hover:bg-indigo-600"
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
        className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg dark:bg-gray-800"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <FindChats setToggleFindChats={setIsFindChatsOpen} />
      </Modal>

      <Modal
        isOpen={isCreateGroupOpen}
        onRequestClose={() => setIsCreateGroupOpen(false)}
        className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg dark:bg-gray-800"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <CreateGroup setToggleFindChats={setIsCreateGroupOpen} />
      </Modal>
    </div>
  );
};

export default Chats;
