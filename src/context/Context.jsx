import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const Provider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Initialize as null for clarity
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState(null);
  const [switchTab, setSwitchTab] = useState("allchats");
  const [fetchChatsAgain, setFetchChatsAgain] = useState(false);

  const FetchChatsAgain = () => setFetchChatsAgain((prev) => !prev); // Toggle correctly
  const baseurl = "https://chitchatnewbackend.onrender.com/";
  // const baseurl = "http://localhost:5000/";

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo, "userInfo");
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Context.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        chats,
        setChats,
        switchTab,
        setSwitchTab,
        FetchChatsAgain,
        fetchChatsAgain,
        setFetchChatsAgain,
        baseurl,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const contextData = () => useContext(Context);
