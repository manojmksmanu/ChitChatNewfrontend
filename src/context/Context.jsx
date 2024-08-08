import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Context = createContext();
export const Provider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const [switchTab, setSwitchTab] = useState("allchats"); //to swtich tabs allchats / peoples/ groups/ create group
  const [fetchChatsAgain,setFetchChatsAgain]=useState(false);
  const FetchChatsAgain =()=>{
    setFetchChatsAgain(!fetchChatsAgain);
  }
const baseurl = "https://chitchat-kuxu.onrender.com/";
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
        baseurl,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const contextData = () => {
  return useContext(Context);
};
