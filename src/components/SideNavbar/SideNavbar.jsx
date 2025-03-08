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
  const { user, switchTab, setSwitchTab, setSelectedChat } = contextData();

  const navsItems = [
    { name: "allchats", icon: <LuMessageCircle />, label: "All Chats" },
    { name: "people", icon: <SlPeople />, label: "Peoples" },
    { name: "groups", icon: <TbUsersGroup />, label: "Groups" },
  ];

  const navSwitch = (e) => {
    setNavToggle(e);
    setSwitchTab(e);
    setSelectedChat();
  };

  return (
    <motion.div
      className="h-screen w-16 md:w-36 bg-gradient-to-b from-indigo-100 via-white to-blue-100 dark:from-[#002047] dark:via-gray-900 dark:to-[#001329] shadow-lg rounded-r-xl flex flex-col justify-between py-4 transition-all duration-300"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Section */}
      <div>
        <div className="flex justify-center mb-6">
            <Logo className="" />
        </div>

        <nav>
          <ul className="flex flex-col gap-4">
            {navsItems.map((item) => (
              <motion.li
                key={item.name}
                onClick={() => navSwitch(item.name)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center md:justify-start p-2 md:pl-4 mx-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  navToggle === item.name
                    ? "bg-indigo-500 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-200 hover:bg-indigo-200 dark:hover:bg-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-300"
                }`}
              >
                <span className="text-xl md:text-2xl">{item.icon}</span>
                <span className="hidden ml-3 text-sm font-medium md:block">
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
            className="flex items-center justify-center w-full p-2 bg-white rounded-lg shadow-md md:justify-start dark:bg-gray-800"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              className="object-cover w-8 h-8 rounded-full md:w-10 md:h-10"
              src={user.pic}
              alt="User Avatar"
            />
            <span className="hidden ml-2 text-xs font-semibold text-gray-700 truncate dark:text-gray-200 md:block">
              {user.name}
            </span>
          </motion.div>
        )}

        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <ThemeToggle />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-full p-2 transition-all duration-300 bg-white rounded-lg shadow-md cursor-pointer md:justify-start dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900"
        >
          <LuLogOut className="text-xl text-red-500 dark:text-red-400" />
          <span className="hidden ml-2 text-xs font-medium text-red-500 dark:text-red-400 md:block">
            Logout
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
