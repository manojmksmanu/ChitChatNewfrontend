import React, { Children, createContext, useContext, useState } from "react";
export const Context = createContext();
export const Provider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState("manoj");
  return (
    <Context.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </Context.Provider>
  );
};
export const contextData = () => {
  return useContext(Context);
};
