import React from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const BouncingIcon = () => {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ y: 0, scale: 1 }}
      animate={{
        y: [0, -15, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      {/* Glowing Background */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          background:
            "radial-gradient(circle, rgba(79, 70, 229, 0.6), transparent)",
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Icon */}
      <IoChatboxEllipsesOutline
        className="relative z-10 w-16 h-16 text-indigo-600 md:w-24 md:h-24 drop-shadow-lg"
        style={{ filter: "drop-shadow(0 0 10px rgba(79, 70, 229, 0.7))" }}
      />

      {/* Orbiting Particle */}
      <motion.div
        className="absolute w-3 h-3 bg-indigo-400 rounded-full opacity-70"
        animate={{
          x: [0, 20, 0, -20, 0],
          y: [0, -20, 0, 20, 0],
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default BouncingIcon;
