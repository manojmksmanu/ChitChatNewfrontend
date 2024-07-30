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
      className="p-2 rounded bg-white drop-shadow-xl dark:bg-gray-700 flex items-center justify-center"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, rotate: 90 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: -90 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "light" ? (
          <FaSun className="text-yellow-500" size={24} />
        ) : (
          <FaMoon className="text-blue-500" size={24} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
