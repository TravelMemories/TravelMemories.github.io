import React from "react";
import { useUserContext } from "../context/UserContext";
import Navbar from "../components/navbar/Navbar";
import MemoryCard from "../components/public-memories/MemoryCard";
import { useTravelsContext } from "../context/TravelsContext";

function PublicMemoriesPage() {
  const { isLoggedIn } = useUserContext();
  const { travels } = useTravelsContext();
  return (
    <>
      {!isLoggedIn && <Navbar />}
      <div className="w-full min-h-[100vh] flex justify-center">
        <div className="pt-20 p-8 container w-full gap-8 flex flex-wrap">
          {travels[0].stages[0].photos.map((photo, idx) => (
            <MemoryCard key={idx} data={photo} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PublicMemoriesPage;
