import React, { useState } from "react";
import Sidebar from "../components/SideNavbar/SideNavbar";
import MessageSection from "../components/MessageSection/MessageSection";
import { motion } from "framer-motion";
import Modal from "../components/ConfirmationModalLogout/Modal";
import { contextData } from "../context/Context";
import Chats from "../components/Chats/Chats";

const Home = () => {
  const { selectedChat, setSelectedChat } = contextData();

  return (
    <div className="flex h-screen overflow-hidden bg-[#D1E6FF]  dark:bg-[#002047]">
      <Sidebar />
      {/* ---All chats --  */}
     
 <Chats />
   
     
      {/* ---All chats Ends --  */}
      <div
        className={`flex-grow p-1  md:block  ${
          selectedChat ? "block" : "hidden"
        }`}
      >
        {/* <UserProfileSection/> */}
        <MessageSection />
      </div>
      <Modal />
    </div>
  );
};

export default Home;
