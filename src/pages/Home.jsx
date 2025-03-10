import React, { useState } from "react";
import Sidebar from "../components/SideNavbar/SideNavbar";
import MessageSection from "../components/MessageSection/MessageSection";
import { motion } from "framer-motion";
import Modal from "../components/ConfirmationModalLogout/Modal";
import { contextData } from "../context/Context";
import Chats from "../components/Chats/Chats";
const Home = () => {
  const { selectedChat } = contextData();

  return (
    <div className="flex h-screen overflow-hidden bg-[#D1E6FF]  dark:bg-[#002047]">
      <Sidebar />
      <div
        className={` pl-2 py-2 md:flex-grow-0  md:block pr-3 md:pr-0
          ${!selectedChat && "block flex-grow"}
          ${selectedChat && "hidden"}
        
        `}
      >
        <Chats />
      </div>

      <div
        className={`flex-grow p-2 pr-2  md:block  ${
          selectedChat ? "block" : "hidden"
        }`}
      >
        <MessageSection />
      </div>
      <Modal />
    </div>
  );
};

export default Home;
