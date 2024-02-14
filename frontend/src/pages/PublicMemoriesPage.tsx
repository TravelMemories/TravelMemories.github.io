import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Navbar from "../components/navbar/Navbar";
import MemoryCard from "../components/public-memories/MemoryCard";
import { useTravelsContext } from "../context/TravelsContext";
import { PrivacyData } from "../model/PrivacyData";
import { PhotoData } from "../model/PhotoData";

function PublicMemoriesPage() {
  const { isLoggedIn, userData } = useUserContext();
  const { publicPhotos, LoadPublicPhotosTravels } = useTravelsContext();

  useEffect(() => {
    LoadPublicPhotosTravels(userData);
  }, []);
  return (
    <>
      {!isLoggedIn && <Navbar />}
      <div className="w-full min-h-[100vh] flex justify-center">
        <div className="pt-20 p-8 container w-full gap-8 flex flex-wrap">
          {publicPhotos.length === 0 && (
            <p className="w-full text-center my-auto text-6xl font-thin">
              There are no public photos available.
            </p>
          )}
          {publicPhotos.map((photo, idx) => (
            <MemoryCard
              key={idx}
              data={photo}
              isUserLogged={isLoggedIn}
              publicMemoriesPage={true}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default PublicMemoriesPage;
