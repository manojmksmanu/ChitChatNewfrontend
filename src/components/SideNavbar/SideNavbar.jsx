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
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navToggle, setNavToggle] = useState("allchats");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navSwitch = (e) => {
    setNavToggle(e);
  };

  return (
    <div className="flex">
      {/* Button to open sidebar */}
      <button className="md:hidden p-4" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        // className={`sidenav_bg fixed top-0 left-0 h-screen drop-shadow-lg bg-white  text-slate-800 w-28 transform ${
        //   isOpen ? "translate-x-0" : "-translate-x-full"
        // } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
        className={`sidenav_bg fixed top-0 left-0 h-screen drop-shadow-lg bg-white  text-slate-800 md:w-28 w-10 transform 
        md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="">
            {/* Button to close sidebar */}
            {/* <button className="md:hidden mb-4" onClick={toggleSidebar}>
              <FaTimes />
            </button> */}
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
                <li
                  onClick={() => navSwitch("allchats")}
                  className={`mt-4 flex items-center pl-2 cursor-pointer hover:border-l-4  hover:border-blue-700 ${
                    navToggle === "allchats"
                      ? "text-blue-700 border-l-4  border-blue-700"
                      : ""
                  }`}
                >
                  <LuMessageCircle />{" "}
                  <span className="text-xs font-normal rounded-sm p-1 w-full md:block hidden">
                    All Chats
                  </span>
                </li>
                <li
                  onClick={() => navSwitch("people")}
                  className={`mt-4 flex items-center pl-2 cursor-pointer hover:border-l-4  hover:border-blue-700 ${
                    navToggle === "people"
                      ? "text-blue-700 border-l-4  border-blue-700"
                      : ""
                  }`}
                >
                  <SlPeople />
                  <span className="bg-white text-xs font-normal rounded-sm p-1 w-full md:block hidden">
                    Peoples
                  </span>
                </li>
                <li
                  onClick={() => navSwitch("groups")}
                  className={`mt-4 flex items-center pl-2 cursor-pointer hover:border-l-4  hover:border-blue-700 ${
                    navToggle === "groups"
                      ? "text-blue-700 border-l-4  border-blue-700"
                      : ""
                  }`}
                >
                  <TbUsersGroup />{" "}
                  <span className="bg-white text-xs font-normal rounded-sm p-1 w-full md:block hidden">
                    Groups
                  </span>
                </li>
                <li
                  onClick={() => navSwitch("creategroup")}
                  className={`mt-4 flex items-center pl-2 cursor-pointer hover:border-l-4  hover:border-blue-700 ${
                    navToggle === "creategroup"
                      ? "text-blue-700 border-l-4  border-blue-700"
                      : ""
                  }`}
                >
                  <MdOutlineGroupAdd />{" "}
                  <span className="bg-white text-xs font-normal rounded-sm p-1 w-full md:block hidden">
                    Create Group
                  </span>
                </li>
              </ul>
            </nav>
          </div>
          {/* ---logout section----  */}
          <div className="flex justify-center p-1">
            <div className="flex gap-3 items-center bg-white drop-shadow-lg w-full rounded-sm p-2 cursor-pointer">
              <LuLogOut className="text-xl text-slate-600" />{" "}
              <span className="text-xs text-slate-600 md:block hidden">
                Logout
              </span>
            </div>
          </div>
          {/* ---logout section ends here----  */}
        </div>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
