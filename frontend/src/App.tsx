import React from "react";
import Home from "./pages/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import YourMemoriesPage from "./pages/YourMemoriesPage";
import PublicMemoriesPage from "./pages/PublicMemoriesPage";
import ProfilePage from "./pages/ProfilePage";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <div className="relative">
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memories" element={<YourMemoriesPage />} />
            <Route path="/public-memories" element={<PublicMemoriesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
