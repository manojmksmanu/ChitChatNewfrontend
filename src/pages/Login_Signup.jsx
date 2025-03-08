import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <section className="flex items-center justify-center min-h-screen p-4 bg-white dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex text-4xl font-bold text-blue-600 dark:text-white">
            <motion.span>C</motion.span>
            <motion.span
              animate={{ rotate: [-20, 10, -20] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              C
            </motion.span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 border-b dark:border-gray-600">
          <button
            onClick={() => setIsSignUp(false)}
            className={`pb-2 w-1/2 text-center ${
              !isSignUp
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-white"
                : "text-gray-500 dark:text-gray-300"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`pb-2 w-1/2 text-center ${
              isSignUp
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-white"
                : "text-gray-500 dark:text-gray-300"
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
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Signup setIsSignUp={setIsSignUp} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
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
            className="text-sm text-blue-500 hover:underline dark:text-blue-400"
          >
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default LoginSignup;
