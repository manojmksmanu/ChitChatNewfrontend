import React, { useState, useRef } from "react";
import axios from "axios";
import { contextData } from "../../context/Context";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Signup = ({ setIsSignUp }) => {
  const { baseurl } = contextData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const fileInputRef = useRef(null);

  const submitHandler = async () => {
    setIsLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${baseurl}api/user`,
        { name, email, password, pic },
        { headers: { "Content-type": "application/json" } }
      );
      toast.success("Signup Successful! Please login.");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsSignUp(false);
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || "Signup failed"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
      postPicToCloudinary(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const postPicToCloudinary = async (file) => {
    if (!file) {
      toast.error("Please select an image");
      return;
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      toast.warn("Only JPEG/PNG images allowed");
      setPreviewUrl(null);
      return;
    }

    setIsImageUploading(true);
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
    } catch (error) {
      toast.error(`Image upload failed: ${error.message}`);
      setPreviewUrl(null);
    } finally {
      setIsImageUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Image Upload Section */}
      <motion.div
        className="flex flex-col items-center justify-center mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="relative w-32 h-32 mb-4 overflow-hidden bg-gray-200 border-4 border-indigo-500 rounded-full cursor-pointer dark:bg-gray-700"
          onClick={triggerFileInput}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-400">
              <svg
                className="w-12 h-12"
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
            </div>
          )}
          {isImageUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-12 h-12 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
            </div>
          )}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
              background:
                "radial-gradient(circle, rgba(79, 70, 229, 0.5), transparent)",
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileSelect}
          className="hidden"
        />

        <motion.button
          type="button"
          onClick={triggerFileInput}
          className="flex items-center px-4 py-2 text-white bg-indigo-500 rounded-lg"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 10px rgba(79, 70, 229, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Upload Profile Photo
        </motion.button>
      </motion.div>

      {/* Inputs */}
      {[
        {
          type: "text",
          placeholder: "Username",
          value: name,
          onChange: setName,
          icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        },
        {
          type: "email",
          placeholder: "Email address",
          value: email,
          onChange: setEmail,
          icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        },
        {
          type: "password",
          placeholder: "Password",
          value: password,
          onChange: setPassword,
          icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
        },
        {
          type: "password",
          placeholder: "Confirm Password",
          value: confirmPassword,
          onChange: setConfirmPassword,
          icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
        },
      ].map((field, index) => (
        <motion.div
          key={field.placeholder}
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
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
                d={field.icon}
              />
            </svg>
          </span>
          <input
            type={field.type}
            className="w-full py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-all duration-200 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-100 dark:placeholder-gray-500 hover:shadow-lg"
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
        </motion.div>
      ))}

      {/* Submit Button */}
      <motion.button
        onClick={submitHandler}
        disabled={isLoading}
        className={`w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg flex items-center justify-center shadow-md ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        whileHover={
          !isLoading && {
            scale: 1.05,
            boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
          }
        }
        whileTap={!isLoading && { scale: 0.95 }}
        transition={{ duration: 0.2 }}
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
      </motion.button>
    </div>
  );
};

export default Signup;
