import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-3 rounded-full overflow-hidden shadow-lg focus:outline-none 
        ${
          theme === "light"
            ? "bg-gradient-to-br from-yellow-200 via-orange-300 to-yellow-400"
            : "bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900"
        }`}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
      }}
      whileTap={{ scale: 0.95, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: theme === "light" ? 0.3 : 0.5,
          background:
            theme === "light"
              ? "radial-gradient(circle, rgba(255, 215, 0, 0.4), transparent)"
              : "radial-gradient(circle, rgba(0, 191, 255, 0.4), transparent)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Icon with Creative Animation */}
      <motion.div
        key={theme}
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.5, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -10 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {theme === "light" ? (
          <FaSun
            className="text-yellow-500 drop-shadow-md"
            size={28}
            style={{ filter: "drop-shadow(0 0 5px rgba(255, 215, 0, 0.7))" }}
          />
        ) : (
          <FaMoon
            className="text-blue-400 drop-shadow-md"
            size={28}
            style={{ filter: "drop-shadow(0 0 5px rgba(0, 191, 255, 0.7))" }}
          />
        )}
      </motion.div>

      {/* Orbiting Particle Effect */}
      <motion.div
        className="absolute w-2 h-2 bg-white rounded-full opacity-60"
        animate={{
          x: [0, 10, 0, -10, 0],
          y: [0, -10, 0, 10, 0],
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
