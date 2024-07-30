import React from "react";
import Sidebar from "../components/SideNavbar/SideNavbar";
import AllChats from "../components/AllChats/AllChats";

const Home = () => {
  return (
    <div className="flex h-screen overflow-hidden ">
      <Sidebar />
      <div>
        <AllChats />
      </div>
    </div>
  );
};

export default Home;
