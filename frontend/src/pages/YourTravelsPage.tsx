import React, { useState } from "react";
import HorizontalDisplay from "../components/general-purpose/HorizontalDisplay";
import { useTravelsContext } from "../context/TravelsContext";

function YourTravelsPage() {
  const { GetUserTravels } = useTravelsContext();
  const [travels] = useState(GetUserTravels());
  return (
    <div className="w-full min-h-[100vh] flex flex-col px-4 lg:px-20 py-4">
      <div className="mt-20 flex flex-col items-center w-full gap-4">
        <h1 className="bg-background-50 text-5xl font-thin px-3 py-1 rounded-md shadow-md">
          Your total travels: <b>{travels.length}</b>
        </h1>
        <div className="w-full">
          <HorizontalDisplay travels={travels} />
        </div>
      </div>
    </div>
  );
}

export default YourTravelsPage;
