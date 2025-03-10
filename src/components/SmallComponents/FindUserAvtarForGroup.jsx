import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa"; // Importing a checkmark icon

const FindUserAvtarForGroup = ({ data, isSelected }) => {
  return (
    <motion.div
      className={`flex items-center w-full gap-3 p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-300 
        ${
        isSelected
          ? "bg-indigo-100 dark:bg-indigo-700 border-2 border-indigo-500"
          : "bg-gray-50 dark:bg-gray-900 hover:bg-indigo-100 dark:hover:bg-indigo-500"
      }
       text-slate-700 dark:text-slate-50 group`}
      whileHover={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Avatar */}
      <div className="relative">
        <img
          className="object-cover w-10 h-10 bg-white rounded-full sm:w-12 sm:h-12 drop-shadow-lg"
          src={data.pic}
          alt={data.name}
        />
        {/* Creative Online Indicator */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full dark:border-gray-900 group-hover:animate-pulse" />
      </div>

      {/* User Info */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-[16px] font-medium truncate">
            {data.name}
          </span>
          {/* Tick Mark for Selected Users */}
          {isSelected && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-indigo-500 dark:text-indigo-300"
            >
              <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.span>
          )}
        </div>
        <span className="text-xs sm:text-[14px] font-light text-gray-600 dark:text-gray-300 truncate">
          {data.email}
        </span>
      </div>
    </motion.div>
  );
};

export default FindUserAvtarForGroup;
