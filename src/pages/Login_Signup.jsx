import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <section className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-indigo-900 dark:to-blue-950">
      {/* Subtle Pulsing Background Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent)",
            "radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent)",
            "radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Particles */}
      <motion.div
        className="absolute w-3 h-3 bg-indigo-400 rounded-full opacity-60"
        animate={{ y: [-20, 20, -20], x: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "15%", left: "20%" }}
      />
      <motion.div
        className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
        animate={{ y: [15, -15, 15], x: [-5, 5, -5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "20%", right: "25%" }}
      />

      <motion.div
        className="relative z-10 w-full max-w-md p-6 space-y-8 bg-white shadow-2xl dark:bg-gray-800 rounded-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glowing Logo */}
        <div className="flex justify-center">
          <motion.div
            className="relative text-5xl font-extrabold text-indigo-600 dark:text-indigo-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            ChitChat
            <motion.div
              className="absolute inset-0 -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                background:
                  "radial-gradient(circle, rgba(79, 70, 229, 0.6), transparent)",
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 border-b border-gray-300 dark:border-gray-700">
          <motion.button
            onClick={() => setIsSignUp(false)}
            className={`pb-3 w-1/2 text-center text-lg font-medium transition-colors duration-200 ${
              !isSignUp
                ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
          <motion.button
            onClick={() => setIsSignUp(true)}
            className={`pb-3 w-1/2 text-center text-lg font-medium transition-colors duration-200 ${
              isSignUp
                ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
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
          <motion.button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            whileHover={{ scale: 1.05, color: "#7C3AED" }}
            transition={{ duration: 0.2 }}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default LoginSignup;
