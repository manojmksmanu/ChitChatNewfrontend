import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import AllChats from "../AllChats/AllChats";
import FindChats from "../FindChats/FindChats";
import { contextData } from "../../context/Context";
const Chats = () => {
  const { selectedChat, switchTab } = contextData();
  const [toggleFindChats, setToggleFindChats] = useState(false);
  const toggleChats = () => {
    setToggleFindChats(!toggleFindChats);
  };
  return (
    <div
      className={`relative md:block md:w-52 w-full ${
        selectedChat ? "hidden" : "block"
      }`}
    >
      <motion.span
        onClick={() => toggleChats()}
        whileHover={{ scale: 0.98 }}
        whileTap={{ scale: 0.94 }}
        className={`${switchTab === "allchats" ? "block" : "hidden"}`}
      >
        <BiSolidMessageSquareAdd className="cursor-pointer text-blue-700  text-4xl  absolute z-20 bottom-2 right-2" />
      </motion.span>
      {!toggleFindChats ? (
        <AllChats />
      ) : (
        <FindChats toggleChats={toggleChats} />
      )}
    </div>
  );
};

export default Chats;
