import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import AllChats from "../AllChats/AllChats";
import FindChats from "../FindChats/FindChats";
import { MdGroupAdd } from "react-icons/md";
import { contextData } from "../../context/Context";
const Chats = () => {
  const { selectedChat, switchTab } = contextData();
  const [toggleFindChats, setToggleFindChats] = useState(false);
  const [toggleCreateGroup, setToggleCreateGroup] = useState(false);
  return (
    <div
      className={`relative md:block md:w-52 w-full ${
        selectedChat ? "hidden" : "block"
      }`}
    >
      {switchTab === "allchats" && (
        <motion.span
          onClick={() => setToggleFindChats(!toggleFindChats)}
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.94 }}
        >
          <BiSolidMessageSquareAdd className="cursor-pointer text-blue-700  text-4xl  absolute z-20 bottom-2 right-2" />
        </motion.span>
      )}
      {switchTab === "groups" && (
        <motion.span
          onClick={() => setToggleCreateGroup(!toggleCreateGroup)}
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.94 }}
        >
          <MdGroupAdd className="cursor-pointer text-blue-700  text-4xl  absolute z-20 bottom-2 right-2" />
        </motion.span>
      )}
      {!toggleFindChats ? (
        <AllChats />
      ) : (
        <FindChats
          toggleFindChats={toggleFindChats}
          setToggleFindChats={setToggleFindChats}
        />
      )}
      {!toggleCreateGroup ? <AllChats /> : ""}
    </div>
  );
};

export default Chats;
