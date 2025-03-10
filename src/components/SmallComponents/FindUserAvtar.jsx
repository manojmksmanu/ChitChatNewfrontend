import React from "react";
import { motion } from "framer-motion";

const FindUserAvtar = ({ data }) => {
  return (
    <motion.div
      className="flex items-center w-full gap-3 p-2 transition-all duration-300 rounded-lg cursor-pointer sm:p-3 bg-gray-50 dark:bg-gray-900 text-slate-700 dark:text-slate-50 hover:bg-indigo-100 dark:hover:bg-indigo-700 group"
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
      
      </div>

      {/* User Info */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-[16px] font-medium truncate">
            {data.name}
          </span>
        </div>
        <span className="text-xs sm:text-[14px] font-light text-gray-600 dark:text-gray-300 truncate">
          {data.email}
        </span>
      </div>
    </motion.div>
  );
};

export default FindUserAvtar;
