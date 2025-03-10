import React from "react";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <div className="flex items-center justify-center pl-1">
      {/* Animated Chat Bubble Icon */}
      <motion.div
        className="relative flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="w-5 h-5 text-blue-500 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <motion.div
          className="absolute w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-blue-500 rounded-full -top-0.5 -right-0.5 xs:-top-1 xs:-right-1"
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Gradient Text - Hidden on very small screens */}
      <motion.div
        className="hidden ml-1 text-sm font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 xs:ml-2 xs:text-base sm:text-lg md:text-xl xs:block"
        animate={{ x: [0, -5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        ChitChat
      </motion.div>
    </div>
  );
};

export default Logo;
