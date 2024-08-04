import React from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const BouncingIcon = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <IoChatboxEllipsesOutline className="md:w-24 md:h-24 w-16 h-16 text-blue-700" />
    </motion.div>
  );
};

export default BouncingIcon;
