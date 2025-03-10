import React, { useState } from "react";
import { LuMessageCircle } from "react-icons/lu";
import { SlPeople } from "react-icons/sl";
import { TbUsersGroup } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import { motion } from "framer-motion";
import Logo from "../SmallComponents/Logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { contextData } from "../../context/Context";

const Sidebar = () => {
  const [navToggle, setNavToggle] = useState("allchats");
  const { user, setSwitchTab, setSelectedChat } = contextData();

  const navsItems = [
    { name: "allchats", icon: <LuMessageCircle />, label: "All Chats" },
    { name: "people", icon: <SlPeople />, label: "People" },
    { name: "groups", icon: <TbUsersGroup />, label: "Groups" },
  ];

  const navSwitch = (e) => {
    setNavToggle(e);
    setSwitchTab(e);
    setSelectedChat(null); // Reset selected chat
  };

  return (
    <motion.div
      className="flex flex-col justify-between w-20 h-screen py-6 transition-all duration-300 bg-white shadow-2xl md:w-64 dark:bg-gray-900 rounded-r-2xl"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Top Section */}
      <div>
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Logo className="w-12 h-12 md:w-16 md:h-16" />
        </motion.div>

        <nav>
          <ul className="flex flex-col gap-3 px-2">
            {navsItems.map((item) => (
              <motion.li
                key={item.name}
                onClick={() => navSwitch(item.name)}
                whileHover={{ scale: 1.01, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center md:justify-start p-3 mx-1 rounded-xl cursor-pointer transition-all duration-100 ${
                  navToggle === item.name
                    ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:text-indigo-700 dark:hover:text-white"
                }`}
              >
                <span className="text-2xl md:text-3xl">{item.icon}</span>
                <span className="hidden ml-4 text-base font-semibold md:block">
                  {item.label}
                </span>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center gap-4 px-2">
        {user && (
          <motion.div
            className="flex items-center justify-center w-full p-3 shadow-md md:justify-start bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <img
              className="object-cover w-10 h-10 border-2 border-indigo-300 rounded-full md:w-12 md:h-12"
              src={user.pic}
              alt="User Avatar"
            />
            <span className="hidden ml-3 text-sm font-semibold text-gray-800 truncate md:block dark:text-gray-200">
              {user.name}
            </span>
          </motion.div>
        )}

        <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
          <ThemeToggle />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-full p-3 transition-all duration-300 shadow-md cursor-pointer md:justify-start bg-gradient-to-r from-red-50 to-white dark:from-red-900 dark:to-gray-800 rounded-xl hover:bg-red-100 dark:hover:bg-red-800"
        >
          <LuLogOut className="text-2xl text-red-600 dark:text-red-400" />
          <span className="hidden ml-3 text-sm font-semibold text-red-600 md:block dark:text-red-400">
            Logout
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
