import React from 'react'
import { motion } from "framer-motion";
const Logo = () => {
  return (
    <div className="flex items-center justify-center pl-2">
      <motion.div
        className="text-blue-500 text-xl font-black"
        animate={{ scale: [1, 1, 1], rotate: [0, 0, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        CC
      </motion.div>
      <motion.div
        className="ml-1 text-gray-800 text-xs font-thin md:block hidden"
        animate={{ x: [0, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ChitChat
      </motion.div>
    </div>
  );
}

export default Logo