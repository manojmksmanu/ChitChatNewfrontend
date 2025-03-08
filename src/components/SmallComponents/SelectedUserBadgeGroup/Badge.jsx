const Badge = ({ data, handleFunction }) => (
  <div className="flex items-center px-2 py-1 text-indigo-800 bg-indigo-100 rounded-full dark:bg-indigo-700 dark:text-indigo-200">
    <span>{data.name}</span>
    <button
      onClick={handleFunction}
      className="ml-2 text-red-500 hover:text-red-700"
    >
      ✕
    </button>
  </div>
);
export default Badge;
