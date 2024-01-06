import React from "react";
import { useUserContext } from "../context/UserContext";
import Navbar from "../components/navbar/Navbar";

function PublicMemoriesPage() {
  const { isLoggedIn } = useUserContext();
  return (
    <>
      {!isLoggedIn && <Navbar />}
      <div>PublicMemoriesPage</div>
    </>
  );
}

export default PublicMemoriesPage;
