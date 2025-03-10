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
  const [onlineUsers, setOnlineUsers] = useState(new Set()); // Store online users

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(baseurl);
    setSocket(socketInstance);

    if (user) {
      socketInstance.emit("setup", user);
    }

    socketInstance.on("connection", () => setSocketConnected(true));

    // Listen for online users updates from the server
    socketInstance.on("onlineUsers", (users) => {
      setOnlineUsers(new Set(users)); // Convert array back to Set
      console.log("Online users updated:", users);
    });

    socketInstance.on("newMessageNotification", (newMessageReceived) => {
      console.log(newMessageReceived);
      FetchChatsAgain();
    });

    // Cleanup function
    return () => {
      socketInstance.disconnect();
      socketInstance.off("connection");
      socketInstance.off("onlineUsers");
      socketInstance.off("newMessageNotification");
    };
  }, [baseurl, user]);

  const value = {
    socket,
    socketConnected,
    setSocketConnected,
    onlineUsers, // Provide onlineUsers in the context
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
