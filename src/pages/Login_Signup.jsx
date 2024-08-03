import React, { useState } from "react";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <section className="bg-white dark:bg-gray-900 flex justify-center">
      <div className="container flex flex-col items-center justify-center min-h-screen md:max-w-sm">
        <div className="flex justify-center ">
          <span className="text-blue-700 font-black text-5xl">CC</span>
        </div>

        <div className="flex items-center sm:w-[50%] w-[80%]  justify-center mt-6 ">
          <a
            href="#"
            onClick={() => setIsSignUp(false)}
            className={`w-3/4 pb-4 font-medium text-center capitalize border-b ${
              isSignUp
                ? "text-gray-500 dark:text-gray-300 dark:border-gray-400"
                : "text-gray-800 border-blue-500 dark:border-blue-400 dark:text-white"
            }`}
          >
            sign in
          </a>

          <a
            href="#"
            onClick={() => setIsSignUp(true)}
            className={`w-3/4 pb-4 font-medium text-center capitalize border-b ${
              isSignUp
                ? "text-gray-800 border-blue-500 dark:border-blue-400 dark:text-white"
                : "text-gray-500 dark:text-gray-300 dark:border-gray-400"
            }`}
          >
            sign up
          </a>
        </div>
        <form className="w-full px-6">{isSignUp ? <Signup /> : <Login />}</form>
        <div className="mt-1 mb-4  text-center ">
          <a
            href="#"
            className="text-[14px] text-blue-500 hover:underline dark:text-blue-400"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </a>
        </div>
      </div>

      <div className="hidden">
        <ThemeToggle />
      </div>
    </section>
  );
};

export default LoginSignup;
