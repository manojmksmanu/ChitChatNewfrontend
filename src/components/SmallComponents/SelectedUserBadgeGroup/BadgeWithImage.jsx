import React from "react";

const BadgeWithImg = ({ data, handleFunction, notshowcross }) => {
  return (
    <div className="flex items-center px-3 py-1 text-indigo-800 bg-indigo-100 rounded-full dark:bg-indigo-700 dark:text-indigo-200">
      {/* User Image */}
      <img
        src={data.pic}
        alt={data.name}
        className="object-cover w-8 h-8 mr-2 border border-gray-300 rounded-full dark:border-gray-500"
      />

      {/* User Name */}
      <span className="text-sm font-medium">{data.name}</span>

      {/* Remove Button (if not hidden) */}
      {!notshowcross && (
        <button
          onClick={handleFunction}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default BadgeWithImg;
