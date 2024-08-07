import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import { contextData } from "../../../context/Context";
import { motion } from "framer-motion";
import Top from "./Top";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

const AllMessages = () => {
  const [showPicker, setShowPicker] = useState(false);
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    contextData();
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleEmoji = (e) => {
    setNewMessage((prev) => prev + e.emoji);
  };

  let typingTimeout;
  useEffect(() => {
    socket = io(ENDPOINT);
    if (user) {
      socket.emit("setup", user);
    }
    socket.on("connection", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    socket.on("new message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("typing");
      socket.off("stop typing");
      socket.off("new message");
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [user]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      // setFetchAgain(!fetchAgain);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  const sendMessage = async (e) => {
    if (e.type === "click" || (e.key === "Enter" && !e.shiftKey)) {
      e.preventDefault();

      if (!newMessage.trim() || isSending) return;

      setIsSending(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/message/message",
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        setNewMessage("");
        setMessages((prevMessages) => [...prevMessages, data]);
        socket.emit("new message", data);
        socket.emit("stop typing", selectedChat._id);
      } catch (error) {
        toast.error("Error sending message");
      } finally {
        setIsSending(false);
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setTyping(false);
      socket.emit("stop typing", selectedChat._id);
    }, 3000); // 3 seconds
  };
  useEffect(() => {
    socket.on("messageR", (newMessageReceived) => {
      console.log(newMessageReceived, "newR");
        if (newMessageReceived) {
          console.log("ello")
          setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
        }
      newMessageReceived
        ? setFetchAgain(!fetchAgain)
        : setFetchAgain(!fetchAgain);
      
      
 
    });
  }, [messages]);
  return (
    <div>
      <div className=" mb-3">
        <Top isTyping={isTyping} />
      </div>
      <div className="bg-white dark:bg-[#001329] w-full h-full flex flex-col flex-grow rounded">
        <div className="flex-grow flex flex-col">
          {loading ? (
            <div className="flex-grow items-center justify-center ">
              <motion.div
                className="flex items-center justify-center z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                style={{ backgroundColor: "transparent" }}
              >
                "loading"
              </motion.div>
            </div>
          ) : (
            <div className="flex-grow overflow-auto">
              <ScrollableChat messages={messages} />
            </div>
          )}
        </div>
        <form
          onSubmit={sendMessage}
          className="flex items-center p-2 bg-gray-50 dark:bg-gray-700"
        >
          <button
            onClick={() => setShowPicker(!showPicker)}
            type="button"
            className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
              />
            </svg>
          </button>
          {showPicker && (
            <div className="absolute bottom-16 right-2 z-10">
              <EmojiPicker
                onEmojiClick={handleEmoji}
                className="max-w-[250px] xs:max-w-[300px] sm:max-w-full max-h-[400px] xs:max-h-full"
                open={open}
              />
            </div>
          )}
          <textarea
            value={newMessage}
            onChange={typingHandler}
            onKeyDown={sendMessage}
            id="chat"
            rows="1"
            className="flex-grow p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none overflow-hidden"
            placeholder="Your message..."
          />
          <button
            type="button"
            className="p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            onClick={sendMessage}
            disabled={isSending}
          >
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AllMessages;
