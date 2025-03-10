import React from "react";
import { contextData } from "../../context/Context";
import { motion } from "framer-motion";
import BadgeWithImg from "../SmallComponents/SelectedUserBadgeGroup/BadgeWithImage";

const GroupDetailsModal = ({ GroupModal }) => {
  const { selectedChat } = contextData();

  if (!GroupModal) return null;

  return (
    <motion.div
      className="p-4 w-72 bg-white/70 dark:bg-[#002047]/80 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-600 rounded-lg text-slate-800 dark:text-white"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Group Name */}
      <h2 className="text-lg font-semibold text-center text-indigo-700 dark:text-indigo-300">
        {selectedChat.chatName}
      </h2>

      {/* Users List */}
      <div className="mt-3 overflow-auto max-h-64 scrollbar-thin scrollbar-thumb-indigo-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800 custom-scrollbar">
        {selectedChat?.users.map((u, i) => (
          <div key={i} className="flex items-center mb-2">
            <BadgeWithImg data={u} notshowcross="notshowcross" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default GroupDetailsModal;
