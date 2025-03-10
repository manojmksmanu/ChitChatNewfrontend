import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BeatLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import FindUserAvtar from "../SmallComponents/FindUserAvtar";
import Badge from "../SmallComponents/SelectedUserBadgeGroup/Badge";
import { contextData } from "../../context/Context";
import axios from "axios";
import toast from "react-hot-toast";

const CreateGroup = ({ setToggleFindChats }) => {
  const { user, setChats, chats, baseurl } = contextData();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [groupPic, setGroupPic] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleImageChangePreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      postDetails(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

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

  const handleGroup = (userToAdd) => {
    if (selectedUser.find((u) => u._id === userToAdd._id)) {
      toast.error("User already added");
    } else {
      setSelectedUser([...selectedUser, userToAdd]);
      toast.success("User added");
    }
  };

  const handleRemove = (userToRemove) => {
    console.log('removing')
    setSelectedUser(selectedUser.filter((u) => u._id !== userToRemove._id));
    toast.success("User removed");
  };

  const handleSubmit = async () => {
    if (!groupChatName) {
      toast.error("Please Group Name");
      return;
    }
    console.log(selectedUser.length)
    if (selectedUser.length<2) {
      toast.error("Please select Minimum 2 users to make group");
      return;
    }
    if (chats.some((chat) => chat.chatName === groupChatName)) {
      toast.error("Group name already exists");
      return;
    }
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(
        `${baseurl}api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUser.map((u) => u._id)),
          groupPic,
        },
        config
      );
      setChats([data, ...chats]);
      toast.success("Group created successfully");
      setToggleFindChats(false);
    } catch (error) {
      toast.error("Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  const postDetails = async (pics) => {
    if (!pics) return toast.error("Please select an image");
    if (pics.type !== "image/jpeg" && pics.type !== "image/png")
      return toast.warn("Only JPEG/PNG allowed");

    setLoading(true);
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "mernchatapp");
    data.append("cloud_name", "dxzu6oq4p");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxzu6oq4p/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      setGroupPic(result.secure_url);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
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
          Create Group
        </h2>
        <button
          onClick={() => setToggleFindChats(false)}
          className="text-lg font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      {/* Image Upload */}
      <div className="flex justify-center mb-6">
        <input
          id="groupPic"
          type="file"
          accept="image/*"
          onChange={handleImageChangePreview}
          className="hidden"
        />
        <label htmlFor="groupPic" className="relative cursor-pointer">
          {previewUrl ? (
            <img
              className="object-cover w-20 h-20 rounded-full"
              src={previewUrl}
              alt="Group Preview"
            />
          ) : (
            <div className="flex items-center justify-center w-20 h-20 text-sm text-gray-500 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-400">
              Upload
            </div>
          )}
          {loading && !previewUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <BeatLoader color="#4f46e5" size={10} />
            </div>
          )}
        </label>
      </div>

      {/* Group Name */}
      <div className="relative mb-6">
        <MdOutlineDriveFileRenameOutline className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 top-1/2 left-3 dark:text-gray-400" />
        <input
          className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
          placeholder="Group Name"
          value={groupChatName}
          onChange={(e) => setGroupChatName(e.target.value)}
        />
      </div>

      {/* Search Users */}
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

      {/* Selected Users */}
      <div className="pb-4 mb-6 overflow-y-auto border-b border-gray-200 max-h-24 custom-scrollbar dark:border-gray-700">
        <AnimatePresence>
          {selectedUser.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedUser.map((user) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    data={user}
                    handleFunction={() => handleRemove(user)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No users selected
            </p>
          )}
        </AnimatePresence>
      </div>

      {/* Search Results */}
      <div className="flex-grow overflow-y-auto max-h-56 custom-scrollbar">
        {loading && searchTerm ? (
          <div className="flex items-center justify-center py-8">
            <BeatLoader color="#4f46e5" size={12} />
          </div>
        ) : searchResult.length > 0 ? (
          <AnimatePresence>
            {searchResult.map((u) => (
              <motion.div
                key={u._id}
                onClick={() => handleGroup(u)}
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

      {/* Create Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-6 w-full py-2.5 bg-indigo-500 text-white rounded-lg flex items-center justify-center transition-all duration-200 ${
          loading ? "opacity-70 cursor-not-allowed" : "hover:bg-indigo-600"
        }`}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        {loading ? <BeatLoader color="#fff" size={10} /> : "Create Group"}
      </motion.button>
    </motion.div>
  );
};

export default CreateGroup;
