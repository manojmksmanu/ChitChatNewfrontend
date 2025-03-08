import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <section className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 space-y-8 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
        {/* Logo */}
        <div className="flex justify-center">
          <motion.div
            className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Chatify
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 border-b border-gray-300 dark:border-gray-700">
          <button
            onClick={() => setIsSignUp(false)}
            className={`pb-3 w-1/2 text-center text-lg font-medium transition-colors duration-200 ${
              !isSignUp
                ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`pb-3 w-1/2 text-center text-lg font-medium transition-colors duration-200 ${
              isSignUp
                ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          {isSignUp ? (
            <motion.div
              key="signup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Signup setIsSignUp={setIsSignUp} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Login />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Link */}
        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm font-medium text-indigo-600 transition-colors duration-200 dark:text-indigo-400 hover:underline"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>

    </section>
  );
};

export default LoginSignup;
