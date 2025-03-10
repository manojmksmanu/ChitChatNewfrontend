import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BeatLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import FindUserAvtarForGroup from "../SmallComponents/FindUserAvtarForGroup";
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

  // Fetch all users when the modal opens
  useEffect(() => {
    handleSearch(""); // Fetch all users on mount
  }, []);

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
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(
        `${baseurl}api/user${term ? `?search=${term}` : ""}`,
        config
      );
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleGroup = (userToAdd) => {
    const isUserSelected = selectedUser.find((u) => u._id === userToAdd._id);
    if (isUserSelected) {
      setSelectedUser(selectedUser.filter((u) => u._id !== userToAdd._id));
      // toast.success("User removed");
    } else {
      setSelectedUser([...selectedUser, userToAdd]);
      // toast.success("User added");
    }
  };
  const handleRemove = (userToRemove) => {
    setSelectedUser(selectedUser.filter((u) => u._id !== userToRemove._id));
    // toast.success("User removed");
  };

  const handleSubmit = async () => {
    if (!groupChatName) {
      toast.error("Please enter a group name");
      return;
    }
    if (selectedUser.length < 2) {
      toast.error("Please select at least 2 users to make a group");
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
      className="flex flex-col w-full h-[90vh] sm:h-[80vh] max-h-[90vh] p-4 sm:p-6 bg-gray-900 rounded-lg shadow-lg relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 shrink-0">
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Create Group
        </h2>
        <button
          onClick={() => setToggleFindChats(false)}
          className="text-lg font-bold text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      {/* Image Upload */}
      <div className="flex justify-center mb-4 sm:mb-5 shrink-0">
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
              className="object-cover w-16 h-16 border-2 border-gray-700 rounded-full sm:w-20 sm:h-20"
              src={previewUrl}
              alt="Group Preview"
            />
          ) : (
            <div className="flex items-center justify-center w-16 h-16 text-xs text-gray-400 bg-gray-800 rounded-full sm:w-20 sm:h-20 sm:text-sm">
              Upload
            </div>
          )}
          {loading && !previewUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-full">
              <BeatLoader color="#4f46e5" size={10} />
            </div>
          )}
        </label>
      </div>

      {/* Group Name */}
      <div className="relative mb-4 sm:mb-5 shrink-0">
        <MdOutlineDriveFileRenameOutline className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
        <input
          className="w-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 transition-all duration-200 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
          placeholder="Group Name"
          value={groupChatName}
          onChange={(e) => setGroupChatName(e.target.value)}
        />
      </div>

      {/* Search Users */}
      <div className="relative mb-4 sm:mb-5 shrink-0">
        <CiSearch className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
        <input
          className="w-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 transition-all duration-200 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
          placeholder="Search Users"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>

      {/* Selected Users */}
      <div className="mb-4 overflow-y-auto border-b border-gray-700 sm:mb-5 max-h-24 shrink-0 custom-scrollbar">
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
            <p className="flex items-center h-full text-sm text-gray-400">
              No users selected
            </p>
          )}
        </AnimatePresence>
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
                onClick={() => handleGroup(u)}
                className="mb-2 transition-all duration-200 rounded-lg cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FindUserAvtarForGroup
                  data={u}
                  isSelected={selectedUser.some((sel) => sel._id === u._id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p className="flex items-center justify-center h-full text-sm text-center text-gray-400 sm:text-base">
            {searchTerm ? "No users found" : "All users"}
          </p>
        )}
      </div>

      {/* Create Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-4 sm:mt-5 w-full py-2 sm:py-2.5 bg-indigo-600 text-white rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 ${
          loading ? "opacity-70 cursor-not-allowed" : "hover:bg-indigo-700"
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
