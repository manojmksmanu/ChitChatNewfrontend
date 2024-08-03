import React, { useState } from "react";
import Sidebar from "../components/SideNavbar/SideNavbar";
import AllChats from "../components/AllChats/AllChats";
import MessageSection from "../components/MessageSection/MessageSection";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import FindChats from "../components/FindChats/FindChats";
import { motion } from "framer-motion";
import Modal from "../components/ConfirmationModalLogout/Modal";
import { contextData } from "../context/Context";
const Home = () => {
  const { selectedChat, setSelectedChat } = contextData();

  console.log(selectedChat);
  const [toggleFindChats, setToggleFindChats] = useState(false);
  const toggleChats = () => {
    setToggleFindChats(!toggleFindChats);
  };
  return (
    <div className="flex h-screen overflow-hidden bg-[#D1E6FF]  dark:bg-[#002047]">
      <Sidebar />
      {/* ---All chats --  */}
      <div className={`relative md:block md:w-52 w-full ${selectedChat==="manoj"?"hidden":"block"}`}>
        <motion.span
          onClick={() => toggleChats()}
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.94 }}
        >
          <BiSolidMessageSquareAdd className="cursor-pointer text-blue-700 border text-4xl border-white absolute z-20 bottom-2 right-2" />
        </motion.span>

        {!toggleFindChats ? <AllChats /> : <FindChats />}
      </div>
      {/* ---All chats Ends --  */}
      <div className={`flex-grow p-1  md:block  ${selectedChat==="manoj"?"block":"hidden"}`}>
        {/* <UserProfileSection/> */}
        <MessageSection />
      </div>
      <Modal />
    </div>
  );
};

export default Home;
