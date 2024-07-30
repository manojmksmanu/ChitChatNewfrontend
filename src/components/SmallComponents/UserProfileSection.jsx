import React from 'react'

const UserProfileSection = () => {
  return (
    <div className='flex p-1 justify-end items-center gap-3 cursor-pointer'>
      {" "}
      <img
        className="w-7 h-7 rounded-full bg-white  p-1"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s"
      />
      <span className='text-[16px] text-slate-500'>
        Manoj Kumar
      </span>
    </div>
  );
}

export default UserProfileSection