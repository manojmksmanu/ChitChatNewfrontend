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
        className={` p-1   md:flex-grow-0
          ${!selectedChat && "block flex-grow"}
        `}
      >
        <Chats />
      </div>

      <div
        className={`flex-grow p-1  md:block  ${
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
