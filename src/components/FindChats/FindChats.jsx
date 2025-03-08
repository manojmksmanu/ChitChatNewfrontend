import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BeatLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import FindUserAvtar from "../SmallComponents/FindUserAvtar";
import { contextData } from "../../context/Context";
import axios from "axios";

const FindChats = ({ setToggleFindChats }) => {
  const { baseurl, user, setChats, chats, setSelectedChat } = contextData();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (term) => {
    if (!term) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(
        `${baseurl}api/user?search=${term}`,
        config
      );
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to load search results");
    } finally {
      setLoading(false);
    }
  };

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
      toast.error("Error starting chat");
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
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
      <div className="relative mb-6">
        <CiSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 top-1/2 left-3 dark:text-gray-400" />
        <input
          className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
          placeholder="Search Users"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>

      {/* Search Results */}
      <div className="flex-grow overflow-y-auto max-h-72 custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <BeatLoader color="#4f46e5" size={12} />
          </div>
        ) : searchResult.length > 0 ? (
          <AnimatePresence>
            {searchResult.map((u) => (
              <motion.div
                key={u._id}
                onClick={() => accessChat(u._id)}
                className="p-3 mb-2 transition-all duration-200 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-indigo-100 dark:hover:bg-indigo-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FindUserAvtar data={u} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : searchTerm ? (
          <p className="py-8 text-center text-gray-500 dark:text-gray-400">
            No users found
          </p>
        ) : (
          <p className="py-8 text-center text-gray-500 dark:text-gray-400">
            Start typing to search users
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

export default FindChats;

// Custom Scrollbar CSS (Add to your global CSS file, e.g., index.css)
const customScrollbarCSS = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-track {
    background: #2d3748;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4f46e5;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #7c3aed;
  }
`;
