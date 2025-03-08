import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { contextData } from "../../context/Context";
import toast from "react-hot-toast";

const Login = () => {
  const { baseurl } = contextData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    setIsLoading(true);
    if (!email || !password) {
      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${baseurl}api/login`,
        { email, password },
        { headers: { "Content-type": "application/json" } }
      );
      toast.success("Login Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/home");
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || "Login failed"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestCredentials = () => {
    setEmail("testuser@gmail.com");
    setPassword("12345");
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </span>
        <input
          type="email"
          className="w-full py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-colors duration-200 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-100 dark:placeholder-gray-500"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
        <input
          type="password"
          className="w-full py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-colors duration-200 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-100 dark:placeholder-gray-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleTestCredentials}
        className="w-full py-3 text-white transition-all duration-200 rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
      >
        Use Test Credentials
      </button>

      <button
        onClick={submitHandler}
        disabled={isLoading}
        className={`w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg flex items-center justify-center transition-all duration-200 shadow-md ${
          isLoading
            ? "opacity-70 cursor-not-allowed"
            : "hover:from-indigo-600 hover:to-purple-700"
        }`}
      >
        {isLoading ? (
          <>
            <svg
              className="w-5 h-5 mr-2 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
              />
            </svg>
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </div>
  );
};

export default Login;
