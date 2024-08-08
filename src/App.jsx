import "./App.css";
import { useEffect, useState } from "react";
import FrontPage from "./components/PageLoading/FrontPage";
import Home from "./pages/Home";
import Login_SignUp from "./pages/Login_Signup";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
function App() {
  const [apiRunning, setApiRunning] = useState(false);
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/status");
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
    };
    checkApiStatus();
  }, []);

  http: return (
    <div className="">
      <Routes>
        <Route path="/" element={<Login_SignUp />} />
        <Route path="/home" element={apiRunning ? <Home /> : <FrontPage />} />
      </Routes>
    </div>
  );
}

export default App;
