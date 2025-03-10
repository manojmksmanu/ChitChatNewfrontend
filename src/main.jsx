import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./context/Context.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  </BrowserRouter>
);
