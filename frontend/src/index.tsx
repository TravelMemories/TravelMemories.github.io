import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";
import { TravelsContextProvider } from "./context/TravelsContext";
import { MapContextProvider } from "./context/MapContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <TravelsContextProvider>
        <MapContextProvider>
          <App />
        </MapContextProvider>
      </TravelsContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
