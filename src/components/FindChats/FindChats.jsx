import React, { useState } from "react";
import FindUserAvtar from "../SmallComponents/FindUserAvtar";
import { CiSearch } from "react-icons/ci";
import { contextData } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
const FindChats = ({ toggleChats }) => {
  const { user, setChats, chats, setSelectedChat } = contextData();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const handleSearch = async (searchTerm) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${searchTerm}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
      console.log(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/chat/chats",
        { _id: userId },
        config
      );
      setSelectedChat([data]);
      toggleChats();
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setLoadingChat(false);
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoadingChat(false);
    }
  };

  return (
    <div className="h-full p-1 flex flex-col custom_scroll_bar">
      <div className="font-semibold text-slate-600 dark:text-slate-50 mb-3">
        Add Users
      </div>

      <div className="w-full mb-2 relative flex items-center">
        <CiSearch className="absolute ml-1 text-slate-500 dark:text-slate-50" />
        <input
          className="w-full rounded dark:bg-[#001329] dark:text-slate-50 placeholder:text-xs flex pl-6 pb-1 focus:no-underline focus:border-none"
          placeholder="Search Users"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Chats */}
      <div className="flex-grow bg-white dark:bg-[#001329] overflow-x-hidden overflow-auto rounded-md">
        <div className="flex flex-col">
          {searchResult ? (
            searchResult.map((u) => (
              <div key={u._id} onClick={() => accessChat(u._id)}>
                <FindUserAvtar data={u} />
              </div>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>
      </div>
      {/* Chats Ends */}
    </div>
  );
};

export default FindChats;
