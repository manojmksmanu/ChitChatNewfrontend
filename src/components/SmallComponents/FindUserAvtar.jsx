import React from 'react'

const FindUserAvtar = () => {
  return (
    <div
      className={`flex md:w-full items-center dark:text-slate-50 text-slate-700 gap-2 cursor-pointer md:p-3 relative `}
    >
      <img
        className="w-8 h-8 rounded-full bg-white drop-shadow-lg p-1"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s"
      />
      <div className="flex flex-col ">
        <div className=" text-[16px] flex items-center justify-between">
          Manoj Kumar
          {/* <span className="text-[12px] ">9:00</span> */}
        </div>
        <div className="text-[12px] font-light"> manoj@gmail.com</div>
      </div>
    </div>
  );
}

export default FindUserAvtar