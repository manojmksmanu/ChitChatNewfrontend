import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import { contextData } from "../../../context/Context";
import { motion } from "framer-motion";
import Top from "./Top";


let socket, selectedChatCompare;

const AllMessages = ({ GroupModal, setGroupModal }) => {
  const [showPicker, setShowPicker] = useState(false);
  const { user, selectedChat, FetchChatsAgain, baseurl } = contextData();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleEmoji = (e) => {
    setNewMessage((prev) => prev + e.emoji);
  };

  const handleGroupModal = () => {
    setGroupModal(!GroupModal);
  };

  let typingTimeout;

  // Combined the socket connection and event listeners setup into a single useEffect
  useEffect(() => {
    socket = io(baseurl);
    if (user) {
      socket.emit("setup", user);
    }

    socket.on("connection", () => {
      setSocketConnected(true);
      console.log('user is contected')
    });

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // Handle incoming messages
    socket.on("new message", (newMessage) => {
      console.log(newMessage)
      if (
        selectedChatCompare &&
        selectedChatCompare._id === newMessage.chat._id
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        // Notification logic can go here if needed
      }
    });

    return () => {
      // Clean up all socket listeners on component unmount
      socket.off("connection");
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
        `${baseurl}api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

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
          `${baseurl}api/message/message`,
          { content: newMessage, chatId: selectedChat._id },
          config
        );
        setNewMessage("");
        setMessages((prevMessages) => [...prevMessages, data]);
        FetchChatsAgain();
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

  return (
    <div>
      <div className=" mb-3">
        <Top isTyping={isTyping} handleGroupModal={handleGroupModal} />
      </div>
      <div className="bg-white dark:bg-[#001329] w-full h-full flex flex-col flex-grow rounded">
        <div className="flex-grow flex flex-col">
          {loading ? (
            <div className="flex-grow flex items-center justify-center h-[calc(100vh-200px)] ">
              <motion.div
                className="flex items-center justify-center z-10 "
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                style={{ backgroundColor: "transparent" }}
              >
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
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
          className="flex items-center justify-center md:p-2 py-2 bg-gray-50 dark:bg-gray-700"
        >
          <button
            onClick={() => setShowPicker(!showPicker)}
            type="button"
            className="md:p-2 p-0.5  text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
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
            className="md:p-2 p-0.5 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
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
