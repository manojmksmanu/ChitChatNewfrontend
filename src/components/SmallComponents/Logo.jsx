import React from 'react'
import { motion } from "framer-motion";
const Logo = () => {
  return (
    <div className="flex items-center justify-center pl-1 sm:pl-2">
      <motion.div
        className="text-lg font-black text-blue-500 sm:text-xl"
        animate={{ scale: [1, 1, 1], rotate: [0, 0, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        CC
      </motion.div>
      <motion.div
        className="hidden ml-1 text-xs font-thin text-gray-800 md:block dark:text-slate-50"
        animate={{ x: [0, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ChitChat
      </motion.div>
    </div>
  );
}

export default Logo