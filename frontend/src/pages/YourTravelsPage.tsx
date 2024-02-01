import React from "react";
import TravelsDisplay from "../components/travels-page/TravelsDisplay";
import HorizontalDisplay from "../components/general-purpose/HorizontalDisplay";
import { useTravelsContext } from "../context/TravelsContext";

function YourTravelsPage() {
  const { travels } = useTravelsContext();
  return (
    <div className="w-full min-h-[100vh] flex flex-col px-4 lg:px-20 py-4">
      <div className="mt-20 flex flex-col items-center w-full gap-8 ">
        <div className="w-full">
          <HorizontalDisplay travels={travels} />
        </div>
      </div>
    </div>
  );
}

export default YourTravelsPage;
