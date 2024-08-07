import "./App.css";
import Home from "./pages/Home";
import Login_SignUp from "./pages/Login_Signup";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Login_SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
