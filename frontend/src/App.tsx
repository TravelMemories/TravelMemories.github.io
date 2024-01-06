import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import YourMemoriesPage from "./pages/YourMemoriesPage";
import PublicMemoriesPage from "./pages/PublicMemoriesPage";
import ProfilePage from "./pages/ProfilePage";

import { useUserContext } from "./context/UserContext";
import NewMemoryPage from "./pages/NewMemoryPage";

function App() {
  const { isLoggedIn } = useUserContext();
  return (
    <div className="relative">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <NewMemoryPage /> : <HomePage />}
          />
          {isLoggedIn && (
            <Route path="/memories" element={<YourMemoriesPage />} />
          )}
          <Route path="/public-memories" element={<PublicMemoriesPage />} />
          {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
