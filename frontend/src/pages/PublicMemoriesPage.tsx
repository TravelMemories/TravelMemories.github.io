import React from "react";
import { useUserContext } from "../context/UserContext";
import Navbar from "../components/navbar/Navbar";

function PublicMemoriesPage() {
  const { isLoggedIn } = useUserContext();
  return (
    <>
      {!isLoggedIn && <Navbar />}
      <div className="w-full min-h-[100vh] flex items-center justify-center">
        PublicMemoriesPage
      </div>
    </>
  );
}

export default PublicMemoriesPage;
