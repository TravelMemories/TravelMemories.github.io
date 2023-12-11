import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="relative">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travel-memories" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
