import React, { useState, useRef, useEffect } from "react";
import Top from "../SmallComponents/ComponentOfMessageSection/Top";
import AllMessages from "../SmallComponents/ComponentOfMessageSection/AllMessages";
import { contextData } from "../../context/Context";
import SelectChatAnimation from "../misc/Animation/SelectChatAnimation";
import GroupDetailsModal from "../GroupDetailsModal/GroupDetailsModal";

const MessageSection = () => {
  const { selectedChat } = contextData();
  const [GroupModal, setGroupModal] = useState(false);
  const modal = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modal.current && !modal.current.contains(event.target)) {
        setGroupModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      {selectedChat ? (
        <div className="relative flex flex-col h-full">
          <AllMessages GroupModal={GroupModal} setGroupModal={setGroupModal} />
          <div ref={modal} className="absolute z-20 top-7 right-7">
            <GroupDetailsModal
              GroupModal={GroupModal}
              setGroupModal={setGroupModal}
            />
          </div>
        </div>
      ) : (
        <div className="h-full w-full rounded-md flex flex-col justify-center items-center bg-slate-50 dark:bg-[#001329]">
          <SelectChatAnimation />
          <span className="text-xs text-blue-700 dark:text-slate-100">
            Select with whom you want to chat
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageSection;
