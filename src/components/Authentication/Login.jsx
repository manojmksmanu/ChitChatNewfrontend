import React, { useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { contextData } from "../../context/Context";

const Login = () => {
  const { baseurl } = contextData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Simplified loading state
  const navigate = useNavigate();

  const submitHandler = async () => {
    setIsLoading(true);
    if (!email || !password) {
      toast.warn("Please fill all fields", { transition: Bounce });
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${baseurl}api/login`,
        { email, password },
        { headers: { "Content-type": "application/json" } }
      );
      toast.success("Login Successful", { transition: Bounce });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/home");
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || "Login failed"}`, {
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestCredentials = () => {
    setEmail("testuser@gmail.com");
    setPassword("12345");
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
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
          className="w-full py-2 pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
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
          className="w-full py-2 pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleTestCredentials}
        className="w-full py-2 text-white transition-colors rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
      >
        Use Test Credentials
      </button>

      <button
        onClick={submitHandler}
        disabled={isLoading}
        className={`w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg flex items-center justify-center ${
          isLoading
            ? "opacity-75 cursor-not-allowed"
            : "hover:from-cyan-600 hover:to-blue-600"
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
