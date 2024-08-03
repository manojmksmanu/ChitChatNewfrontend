// src/Sidebar.js
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { SlPeople } from "react-icons/sl";
import { TbUsersGroup } from "react-icons/tb";
import { MdOutlineGroupAdd } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { motion } from "framer-motion";
import Logo from "../SmallComponents/Logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navToggle, setNavToggle] = useState("allchats");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navsItems = [
    {
      name: "allchats",
      icon: <LuMessageCircle />,
      label: "All Chats",
    },
    { name: "people", icon: <SlPeople />, label: "Peoples" },
    { name: "groups", icon: <TbUsersGroup />, label: "Groups" },
    {
      name: "creategroup",
      icon: <MdOutlineGroupAdd />,
      label: "Create Group",
    },
  ];

  const navSwitch = (e) => {
    setNavToggle(e);
  };

  return (
    <div className="flex">
      {/* Button to open sidebar */}
      <button className="md:hidden md:p-4 sm:p-3 p-2" onClick={toggleSidebar}>
        <FaBars />
      </button>
      {/* Sidebar */}
      <div
        // className={`sidenav_bg fixed top-0 left-0 h-screen drop-shadow-lg bg-white  text-slate-800 w-28 transform ${
        //   isOpen ? "translate-x-0" : "-translate-x-full"
        // } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
        className={`sidenav_bg fixed top-0 left-0 h-screen drop-shadow-lg bg-white dark:bg-[#001329]  text-slate-800 md:w-28 sm:w-10 w-8 transform 
        md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="">
            <nav>
              <ul className="flex flex-col">
                {/* <li className="mt-4">
                <div className="flex items-center justify-center ">
                  <div className="relative">
                    <img
                      src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                      alt="Profile"
                      className="w-20 h-20 rounded-full border-4 border-white"
                    />
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-blue-500"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-blue-500"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>
              </li> */}
                <li className="mt-4 flex">
                  <Logo />
                </li>
                {navsItems.map((item) => (
                  <motion.li
                    key={item.name}
                    onClick={() => navSwitch(item.name)}
                    whileTap={{ scale: 0.99 }}
                    className={`mt-4 flex items-center dark:text-slate-50 pl-2 cursor-pointer transition-all ${
                      navToggle === item.name
                        ? "text-blue-700 dark:text-blue-600 border-l-4 border-blue-700 "
                        : "hover:border-l-4  hover:border-blue-700 hover:text-blue-700"
                    }`}
                  >
                    <span className=""> {item.icon}</span>

                    <span className="text-xs font-normal transition-all rounded-sm p-1 w-full  md:block hidden ">
                      {item.label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
          {/* ---logout section----  */}
          <div className="flex flex-col justify-center p-1 gap-2">
            <ThemeToggle />
            <motion.div
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              className="flex gap-3 items-center bg-white dark:bg-gray-700 drop-shadow-lg w-full rounded-sm sm:p-2 p-1 cursor-pointer"
            >
              <LuLogOut className="text-xl text-slate-600 dark:text-slate-50" />
              <span
                type="button"
                id="deleteButton"
                data-modal-target="deleteModal"
                data-modal-toggle="deleteModal"
                className="text-xs text-slate-600  md:block hidden dark:text-slate-50"
              >
                Logout
              </span>
            </motion.div>
          </div>
          {/* ---logout section ends here----  */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
