import "./App.css";
import { useEffect, useState } from "react";
import FrontPage from "./components/PageLoading/FrontLoadingPage";
import Home from "./pages/Home";
import Login_SignUp from "./pages/Login_Signup";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { contextData } from "./context/Context";
import { Toaster } from "react-hot-toast";
import FrontLoadingPage from "./components/PageLoading/FrontLoadingPage";
import FrontApiNotRunningPage from "./components/PageLoading/FrontApiNotRunningPage";

function App() {
  const [apiRunning, setApiRunning] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const { baseurl } = contextData();

  const checkApiStatus = async () => {
    setLoading(true); // API call start hone se pehle loading true kar do
    try {
      const response = await axios.get(`${baseurl}status`);
      if (
        response.status === 200 &&
        response.data.status === "API is running"
      ) {
        setApiRunning(true);
      } else {
        setApiRunning(false);
      }
    } catch (error) {
      console.error("Error checking API status:", error);
      setApiRunning(false);
    }
    setLoading(false); // API call complete hone ke baad loading false kar do
  };

  useEffect(() => {
    checkApiStatus(); 
  }, []);

  return (
    <div className="">
      <Toaster />
      <Routes>
        <Route path="/" element={<Login_SignUp />} />
        <Route
          path="/home"
          element={
            loading ? (
              <FrontLoadingPage />
            ) : apiRunning ? (
              <Home />
            ) : (
              <FrontApiNotRunningPage />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
