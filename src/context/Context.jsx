import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Context = createContext();
export const Provider = ({ children }) => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState("manoj");
  const [user, setUser] = useState();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <Context.Provider value={{ selectedChat, setSelectedChat, user }}>
      {children}
    </Context.Provider>
  );
};
export const contextData = () => {
  return useContext(Context);
};
