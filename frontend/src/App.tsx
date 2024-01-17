import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import YourMemoriesPage from "./pages/YourTravelsPage";
import PublicMemoriesPage from "./pages/PublicMemoriesPage";
import ProfilePage from "./pages/ProfilePage";
import { useUserContext } from "./context/UserContext";
import HomePage from "./pages/HomePage";
import NewMemoryPage from "./pages/NewMemoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TravelPage from "./pages/TravelPage";
import NewTravelPage from "./pages/NewTravelPage";

function App() {
  const { isLoggedIn } = useUserContext();
  return (
    <div className="relative">
      <BrowserRouter>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <NewMemoryPage /> : <HomePage />}
          />
          {isLoggedIn && (
            <Route path="/travels" element={<YourMemoriesPage />} />
          )}
          <Route path="/public-memories" element={<PublicMemoriesPage />} />
          {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
          {isLoggedIn && <Route path="/travel/:id" element={<TravelPage />} />}
          {isLoggedIn && (
            <Route path="/new-travel" element={<NewTravelPage />} />
          )}
          {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}
          {!isLoggedIn && <Route path="/register" element={<RegisterPage />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
