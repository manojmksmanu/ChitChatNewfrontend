import React, { useState } from "react";
import FindUserAvtar from "../SmallComponents/FindUserAvtar";
import { CiSearch } from "react-icons/ci";
import { contextData } from "../../context/Context";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import Badge from "../SmallComponents/SelectedUserBadgeGroup/Badge";
const CreateGroup = ({ toggleFindChats, setToggleFindChats }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { user, setChats, chats, baseurl } = contextData();

  const [loading, setLoading] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [selectedUser, setSelectedUser] = useState([]);
  const [groupPic, setGroupPic] = useState();
  // const [loadingChat, setLoadingChat] = useState(false);
  const handleImageChangePreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      postDetails(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };
  const handleSearch = async (searchTerm) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${baseurl}api/user?search=${searchTerm}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    
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
  const handleGroup = (userToAdd) => {
    if (selectedUser && selectedUser.find((u) => u._id === userToAdd._id)) {
      toast.warn("User already added");
    } else {
      setSelectedUser([...selectedUser, userToAdd]);
      toast.success("User added successfully");
    }
  };
  const handleRemove = (userToRemove) => {
    setSelectedUser(
      selectedUser.filter((user) => user._id !== userToRemove._id)
    );
    toast.success("User removed successfully");
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUser.length) {
      toast.warning("Please fill all the fields");
      return;
    }
    if (chats.some((chat) => chat.chatName === groupChatName)) {
      toast.warning("Name is already used");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${baseurl}api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUser.map((u) => u._id)),
          groupPic: groupPic,
        },
        config
      );
      setChats([data, ...chats]);
      setLoading(false);
      toast.success("Group is Created");
      setToggleFindChats(false);
    } catch (error) {
      setLoading(false);
      toast.error("Group Not Created");
    }
  };
  const postDetails = async (pics) => {
    setLoading(true);
    if (!pics) {
      toast.error("Please select an image");
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mernchatapp");
      data.append("cloud_name", "dxzu6oq4p");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dxzu6oq4p/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        const result = await res.json();
        if (result.secure_url) {
          setGroupPic(result.secure_url);
          toast.success("Image uploaded successfully");
        } else {
          throw new Error(result.error.message);
        }
      } catch (error) {
        toast.error(`Failed to upload image: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      toast.warn("Please select a JPEG or PNG image");
      setLoading(false);
    }
  };
  return (
    <div className="h-full p-1 flex flex-col custom_scroll_bar ">
      <div className="font-semibold text-slate-600 dark:text-slate-50 mb-3">
        Create New Group
      </div>

      {/* --Image --  */}
      <div className=" mb-2 flex justify-center">
        <input
          id="groupPic"
          type="file"
          accept="image/*"
          onChange={handleImageChangePreview}
          className="file-input hidden"
        />
        <label htmlFor="groupPic">
          {previewUrl ? (
            loading ? (
              <img
                className="rounded-full w-14 h-14"
                src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif"
              />
            ) : (
              <div className="image-preview">
                <img
                  className="rounded-full w-14 h-14"
                  src={previewUrl}
                  alt="Preview"
                />
              </div>
            )
          ) : (
            <img
              className="rounded-full w-14 h-14"
              src="https://shorturl.at/Fmg9K"
              alt="image description"
            />
          )}
        </label>
      </div>
      {/* --group name--  */}
      <div className="w-full mb-2 relative flex items-center">
        <MdOutlineDriveFileRenameOutline className="absolute ml-1 text-slate-500 dark:text-slate-50" />
        <input
          className="w-full rounded dark:bg-[#001329] dark:text-slate-50 placeholder:text-xs flex pl-6 pb-1 focus:no-underline focus:border-none"
          placeholder="Group Name"
          onChange={(e) => setGroupChatName(e.target.value)}
          value={groupChatName}
        />
      </div>
      {/* --Search Users -- */}
      <div className="w-full mb-1 relative flex items-center">
        <CiSearch className="absolute ml-1 text-slate-500 dark:text-slate-50" />
        <input
          className="w-full rounded dark:bg-[#001329] dark:text-slate-50 placeholder:text-xs flex pl-6 pb-1 focus:no-underline focus:border-none"
          placeholder="Search Users"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {/* ---Added user of Group--  */}
      <div className="flex gap-2 flex-wrap mb-2">
        {selectedUser &&
          selectedUser.map((user) => (
            <div
              key={user._id}
              className="mt-2"
              onClick={() => handleRemove(user)}
            >
              <Badge
                data={user}
                //   handleFuntion={(e) => handleRemove(e)}
              />
            </div>
          ))}
      </div>
      {/* ---Added user of End Group--  */}

      {/* Chats */}
      <div className="flex-grow bg-white dark:bg-[#001329] overflow-x-hidden overflow-auto rounded-md">
        <div className="flex flex-col">
          {searchResult ? (
            searchResult.map((u) => (
              <div key={u._id} onClick={() => handleGroup(u)}>
                <FindUserAvtar data={u} />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center  mb-2 mt-1"
        onClick={() => handleSubmit()}
      >
        Create Group
      </button>
      {/* Chats Ends */}
    </div>
  );
};

export default CreateGroup;
