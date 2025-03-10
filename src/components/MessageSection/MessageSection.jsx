import React, { useState, useRef, useEffect } from "react";
import Top from "../SmallComponents/ComponentOfMessageSection/Top";
import AllMessages from "../SmallComponents/ComponentOfMessageSection/AllMessages";
import { contextData } from "../../context/Context";
import SelectChatAnimation from "../misc/Animation/SelectChatAnimation";
import GroupDetailsModal from "../GroupDetailsModal/GroupDetailsModal";
import { motion } from "framer-motion";

const MessageSection = () => {
  const { selectedChat } = contextData();
  const [GroupModal, setGroupModal] = useState(false);
  const modal = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modal.current && !modal.current.contains(event.target)) {
        setGroupModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      className="flex flex-col w-full h-full overflow-hidden bg-white shadow-xl dark:bg-gray-900 rounded-xl"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {selectedChat ? (
        <div className="relative flex flex-col h-full">
          <AllMessages GroupModal={GroupModal} setGroupModal={setGroupModal} />
          <motion.div
            ref={modal}
            className="absolute z-20 top-4 right-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: GroupModal ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <GroupDetailsModal
              GroupModal={GroupModal}
              setGroupModal={setGroupModal}
            />
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SelectChatAnimation />
          <motion.span
            className="mt-4 text-sm font-medium text-indigo-700 md:text-base dark:text-indigo-300"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Select someone to start chatting
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MessageSection;
