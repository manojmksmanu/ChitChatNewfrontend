import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();
 useEffect(() => {
   const user = JSON.parse(localStorage.getItem("userInfo"));
   if (user) {
     navigate("/home", { replace: true });
   }
 }, [navigate]);
  return (
    <section className="bg-white dark:bg-gray-900 flex justify-center">
      <div className="container flex flex-col items-center justify-center min-h-screen md:max-w-sm">
        <div className="flex justify-center">
          <div className="logo-container">
            <div className="logo flex text-blue-600 dark:text-white font-black text-4xl">
              <motion.div className="c c1">C</motion.div>
              <motion.div
                className="c c2"
                animate={{ rotate: [-20, 10, -20] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                C
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex items-center sm:w-[50%] w-[80%] justify-center mt-6">
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

        <div className="w-full px-6" style={{ minHeight: "400px" }}>
          <AnimatePresence mode="wait">
            {isSignUp ? (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Signup setIsSignUp={setIsSignUp} />
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Login />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-1 mb-4 text-center">
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
      <ToastContainer />
    </section>
  );
};

export default LoginSignup;
