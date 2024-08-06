import React, { useEffect } from "react";
import ChatsAvtar from "../SmallComponents/ChatsAvtar";
import { contextData } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

const AllChats = () => {
  const { chats, setChats, user, selectedChat, setSelectedChat, switchTab } =
    contextData();
  const fetchChats = async () => {
    if (!user) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/chat/chats",
        config
      );
      setChats(data);
    } catch (error) {
      toast.error("Failed to Load the chats");
    }
  };

  useEffect(() => {
    fetchChats();
  }, [user]);

  // if (!chats) {
  //   return <div>Loading...</div>; // Display loading message or spinner
  // }

  return (
    <div className="h-full md:p-1 p-1 flex flex-col custom_scroll_bar w-full relative">
      <div className="font-semibold text-slate-600 dark:text-slate-100 mb-3 pl-1">
        {switchTab === "allchats" && <span>All Chats</span>}
        {switchTab === "people" && <span>All Peoples</span>}
        {switchTab === "groups" && <span>All Groups</span>}
      </div>
      {/* Chats */}
      <div className="flex-grow bg-white dark:bg-[#001329] overflow-x-hidden overflow-auto rounded-md">
        <div className="flex flex-col ">
          {switchTab === "allchats" &&
            chats?.map((chat) => (
              <div key={chat._id} onClick={() => setSelectedChat(chat)}>
                <ChatsAvtar data={chat} />
              </div>
            ))}
          {switchTab === "people" &&
            chats
              .filter((chat) => chat.isGroupChat === false) // Add the appropriate filter condition here
              .map((chat) => (
                <div key={chat._id} onClick={() => setSelectedChat(chat)}>
                  <ChatsAvtar data={chat} />
                </div>
              ))}
          {switchTab === "groups" &&
            chats
              .filter((chat) => chat.isGroupChat === true)
              .map((chat) => (
                <div key={chat._id} onClick={() => setSelectedChat(chat)}>
                  <ChatsAvtar data={chat} />
                </div>
              ))}
        </div>
      </div>
      {/* Chats Ends */}
    </div>
  );
};

export default AllChats;
