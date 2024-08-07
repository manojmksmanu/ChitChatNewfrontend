import React from "react";
import { motion } from "framer-motion";
const FrontPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center gap-3">
      <div className="logo-container">
        <div className="logo flex text-blue-600 dark:text-white font-black text-4xl">
          <motion.div className="c c1">C</motion.div>
          <motion.div
            className="c c2"
            animate={{ rotate: [-20, 10, -20] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            C
          </motion.div>
        </div>
      </div>
      Loading...
    </div>
  );
};

export default FrontPage;
