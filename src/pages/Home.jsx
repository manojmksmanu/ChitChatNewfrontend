import React from "react";
import Sidebar from "../components/SideNavbar/SideNavbar";
import AllChats from "../components/AllChats/AllChats";
import MessageSection from "../components/MessageSection/MessageSection";

const Home = () => {
  return (
    <div className="flex h-screen overflow-hidden ">
      <Sidebar />
      <div>
        <AllChats />
      </div>
      <div className="flex-grow p-1">
        <MessageSection/>
      </div>
    </div>
  );
};

export default Home;
