import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { BeatLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import FindUserAvtar from "../SmallComponents/FindUserAvtar";
import { contextData } from "../../context/Context";
import axios from "axios";

const FindUserForChat = ({ setToggleFindChats }) => {
  const { baseurl, user, setChats, chats, setSelectedChat } = contextData();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (term) => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(
        `${baseurl}api/user${term ? `?search=${term}` : ""}`,
        config
      );
      setSearchResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const accessChat = async (userId) => {
    setLoadingChat(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${baseurl}api/chat/chats`,
        { _id: userId },
        config
      );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setToggleFindChats(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col w-full h-[70vh] sm:h-[80vh] max-h-[500px] p-4 sm:p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 relative" // Fixed height with max-h
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 shrink-0">
        <h2 className="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-100">
          Add Users
        </h2>
        <button
          onClick={() => setToggleFindChats(false)}
          className="text-lg font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-4 sm:mb-6 shrink-0">
        <CiSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 top-1/2 left-3 dark:text-gray-400" />
        <input
          className="w-full py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-100 dark:placeholder-gray-500 sm:text-base"
          placeholder="Search Users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <BeatLoader color="#4f46e5" size={12} />
          </div>
        ) : searchResult.length > 0 ? (
          <AnimatePresence>
            {searchResult.map((u) => (
              <motion.div
                key={u._id}
                onClick={() => accessChat(u._id)}
                className="mb-2 transition-all duration-200 rounded-lg cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FindUserAvtar data={u} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p className="flex items-center justify-center h-full text-sm text-center text-gray-500 dark:text-gray-400 sm:text-base">
            No users found
          </p>
        )}
      </div>

      {/* Loading Overlay */}
      {loadingChat && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 rounded-lg dark:bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <BeatLoader color="#4f46e5" size={12} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default FindUserForChat;
