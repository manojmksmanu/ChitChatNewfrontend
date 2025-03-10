// context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { contextData } from "./Context";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const { user, baseurl, FetchChatsAgain } = contextData();

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(baseurl);
    setSocket(socketInstance);
    if (user) {
      socketInstance.emit("setup", user);
    }
    socketInstance.on("connection", () => setSocketConnected(true));
    socketInstance.on("newMessageNotification", (newMessageReceived) => {
      console.log(newMessageReceived);
      FetchChatsAgain();
    });

    // Cleanup function
    return () => {
      socketInstance.disconnect();
      socketInstance.off("connection");
    };
  }, [baseurl, user]);

  const value = {
    socket,
    socketConnected,
    setSocketConnected,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
