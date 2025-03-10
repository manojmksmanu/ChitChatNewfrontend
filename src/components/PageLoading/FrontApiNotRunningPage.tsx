import React from "react";
import { motion } from "framer-motion";

const FrontApiNotRunningPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated circles in background */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20 dark:opacity-10"
            style={{
              background: `linear-gradient(45deg, #4f46e5 0%, #60a5fa 100%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{
              width: `${30 + Math.random() * 70}px`,
              height: `${30 + Math.random() * 70}px`,
              x: -20,
              y: -20,
            }}
            animate={{
              x: Math.random() * 40 - 20,
              y: Math.random() * 40 - 20,
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center">
        {/* Chat Bubble Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Chat Bubble */}
            <motion.div
              className="w-24 h-24 bg-white shadow-lg rounded-2xl dark:bg-gray-800"
              animate={{ rotate: [0, 2, 0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />

            {/* Chat Bubble Tail */}
            <motion.div
              className="absolute w-6 h-6 rotate-45 bg-white rounded-sm -bottom-2 right-5 dark:bg-gray-800"
              animate={{ y: [0, 1, 0, -1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                delay: 0.2,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Logo Letters */}
          <div className="absolute inset-0 flex items-center justify-center space-x-1">
            <motion.div
              className="text-3xl font-black text-indigo-600 dark:text-indigo-400"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              C
            </motion.div>
            <motion.div
              className="text-3xl font-black text-blue-500 dark:text-blue-400"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                delay: 0.4,
                duration: 0.5,
                rotate: {
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                  delay: 0.8,
                },
              }}
            >
              C
            </motion.div>
          </div>
        </motion.div>

        {/* App Name */}
        <motion.h1
          className="mt-6 text-3xl font-bold tracking-tight text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          ChitChat
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mt-2 text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
         Sorry, Server is not running
        </motion.p>

        {/* Loading Dots */}
        <div className="flex mt-8 space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-indigo-500 rounded-full dark:bg-indigo-400"
              animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrontApiNotRunningPage;
