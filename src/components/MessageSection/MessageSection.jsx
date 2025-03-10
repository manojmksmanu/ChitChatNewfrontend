import React, { useState, useRef, useEffect } from "react";
import AllMessages from "../SmallComponents/ComponentOfMessageSection/AllMessages";
import { contextData } from "../../context/Context";
import GroupDetailsModal from "../GroupDetailsModal/GroupDetailsModal";
import { motion } from "framer-motion";
import BouncingIcon from "../misc/Animation/BouncingIcon";

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
      className="flex flex-col w-full h-full overflow-hidden shadow-xl rounded-xl"
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
          className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-200 dark:from-gray-900 dark:via-indigo-900 dark:to-blue-900 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle Pulsing Background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent)",
                "radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent)",
                "radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Bouncing Icon with Glow */}
          <BouncingIcon/>

          {/* Animated Text */}
          <motion.span
            className="relative z-10 mt-6 text-base font-semibold text-indigo-700 md:text-lg dark:text-indigo-300 drop-shadow-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Select someone to start chatting
          </motion.span>

          {/* Floating Dots for Extra Flair */}
          <motion.div
            className="absolute w-2 h-2 bg-indigo-500 rounded-full opacity-50"
            animate={{ y: [-10, 10, -10], x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: "20%", left: "30%" }}
          />
          <motion.div
            className="absolute w-3 h-3 bg-purple-500 rounded-full opacity-50"
            animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ bottom: "25%", right: "25%" }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default MessageSection;
