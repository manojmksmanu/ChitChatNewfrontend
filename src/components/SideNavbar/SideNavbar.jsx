import React, { useState } from "react";
import { LuMessageCircle } from "react-icons/lu";
import { SlPeople } from "react-icons/sl";
import { TbUsersGroup } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../SmallComponents/Logo";
import { contextData } from "../../context/Context";
import { FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Theme } from "emoji-picker-react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Sidebar = () => {
  const [navToggle, setNavToggle] = useState("allchats");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user, setSwitchTab, setSelectedChat } = contextData();
  const navigate = useNavigate();

  const navsItems = [
    { name: "allchats", icon: <LuMessageCircle />, label: "All Chats" },
    { name: "people", icon: <SlPeople />, label: "People" },
    { name: "groups", icon: <TbUsersGroup />, label: "Groups" },
  ];

  const navSwitch = (e) => {
    setNavToggle(e);
    setSwitchTab(e);
    setSelectedChat(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    setIsLogoutModalOpen(false);
    localStorage.removeItem("userInfo");
    navigate("/", { replace: true });
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      {/* Sidebar */}
      <motion.div
        className="flex flex-col justify-between w-12 py-4 transition-all duration-300 border-r shadow-xl h-sreen bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sm:w-20 lg:w-48 md:w-44 rounded-r-2xl border-gray-200/50 dark:border-gray-700/50"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Top Section */}
        <div>
          <motion.div
            className="flex justify-center mb-6 sm:mb-8 md:mb-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Logo />
          </motion.div>

          <nav>
            <ul className="flex flex-col gap-3 px-1 sm:gap-4 sm:px-2">
              {navsItems.map((item) => (
                <motion.li
                  key={item.name}
                  onClick={() => navSwitch(item.name)}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center md:justify-start p-2 sm:p-3 mx-1 rounded-xl cursor-pointer transition-all duration-200 ${
                    navToggle === item.name
                      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-200 hover:bg-gradient-to-r hover:from-indigo-100/80 hover:to-blue-100/80 dark:hover:from-indigo-800/80 dark:hover:to-blue-800/80 hover:text-indigo-700 dark:hover:text-white"
                  }`}
                >
                  <span className="text-xl sm:text-2xl md:text-3xl">
                    {item.icon}
                  </span>
                  <span className="hidden ml-3 text-sm font-medium tracking-wide md:block md:text-base">
                    {item.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-3 px-1 sm:gap-4 sm:px-2">
          {/* Theme Toggle */}
        <ThemeToggle/>

          {user && (
            <motion.div
              className="flex items-center justify-center w-full p-2 border shadow-md sm:p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl md:justify-start border-gray-200/50 dark:border-gray-700/50"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  className="object-cover w-8 h-8 border-2 border-indigo-400 rounded-full sm:w-10 sm:h-10 md:w-12 md:h-12"
                  src={user.pic}
                  alt="User Avatar"
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full sm:w-3 sm:h-3 dark:border-gray-900"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <span className="hidden ml-3 text-xs font-medium text-gray-800 truncate md:block md:text-sm dark:text-gray-100">
                {user.name}
              </span>
            </motion.div>
          )}

          {/* Logout Button */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-2 transition-all duration-300 border shadow-md cursor-pointer sm:p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl md:justify-start border-red-200/50 dark:border-red-700/50 hover:bg-red-100/80 dark:hover:bg-red-800/80"
          >
            <LuLogOut className="text-xl text-red-500 sm:text-2xl md:text-2xl dark:text-red-400" />
            <span className="hidden ml-3 text-xs font-medium text-red-500 md:block md:text-sm dark:text-red-400">
              Logout
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Logout Confirmation Modal - Moved outside Sidebar */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800 w-80 max-w-[90vw]" // Added max-w for small screens
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Confirm Logout
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Are you sure you want to log out? This will clear your local
                storage.
              </p>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={cancelLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
