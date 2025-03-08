import React, { useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { contextData } from "../../context/Context";

const Signup = ({ setIsSignUp }) => {
  const { baseurl } = contextData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async () => {
    setIsLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.warn("Please fill all fields", { transition: Bounce });
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match", { transition: Bounce });
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${baseurl}api/user`,
        { name, email, password, pic },
        { headers: { "Content-type": "application/json" } }
      );
      toast.success("Signup Successful! Please login.", { transition: Bounce });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsSignUp(false);
    } catch (error) {
      toast.error(
        `Error: ${error.response?.data?.message || "Signup failed"}`,
        { transition: Bounce }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const postPicToCloudinary = async (file) => {
    if (!file) {
      toast.error("Please select an image", { transition: Bounce });
      return;
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      toast.warn("Only JPEG/PNG images allowed", { transition: Bounce });
      return;
    }

    setIsLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "mernchatapp");
    data.append("cloud_name", "dxzu6oq4p");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxzu6oq4p/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      setPic(result.secure_url);
      toast.success("Image uploaded successfully", { transition: Bounce });
    } catch (error) {
      toast.error(`Image upload failed: ${error.message}`, {
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        <input
          type="text"
          className="w-full py-2 pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <input
        type="file"
        accept="image/jpeg,image/png"
        onChange={(e) => postPicToCloudinary(e.target.files[0])}
        className="w-full py-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
      />

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
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

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
            Signing Up...
          </>
        ) : (
          "Sign Up"
        )}
      </button>
    </div>
  );
};

export default Signup;
