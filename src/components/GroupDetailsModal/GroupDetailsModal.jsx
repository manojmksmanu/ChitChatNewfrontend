import React from "react";
import { contextData } from "../../context/Context";
import Badge from "../SmallComponents/SelectedUserBadgeGroup/Badge";
const GroupDetailsModal = ({ GroupModal }) => {
  const { selectedChat } = contextData();
  console.log(selectedChat);
  console.log(GroupModal);
  if (!GroupModal) {
    return;
  }
  return (
    <div className="p-2 max-w-96 w-40 bg-white dark:bg-[#002047] drop-shadow-lg dark:border-white border-2 rounded-md text-slate-800 dark:text-white">
      <span className="mb-2">{selectedChat.chatName}</span>
      <div className="group-users-scroll overflow-auto">
        <div className=" max-h-[400px] overflow-auto">
          {selectedChat &&
            selectedChat.users.map((u, i) => {
              return (
                <div key={i} className="mb-2">
                  <Badge data={u} notshowcross={"notshowcross"} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsModal;
