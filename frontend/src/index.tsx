import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";
import { TravelsContextProvider } from "./context/TravelsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <TravelsContextProvider>
        <App />
      </TravelsContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
