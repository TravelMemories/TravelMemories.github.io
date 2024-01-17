import React from "react";
import { useTravelsContext } from "../../context/TravelsContext";
import TravelCard from "./TravelCard";

function TravelsDisplay() {
  const { travels } = useTravelsContext();
  return (
    <div className="w-full sm:h-auto mx-auto bg-background-50 p-8 gap-4 flex sm:flex-row flex-col items-center">
      {travels.map((travel) => (
        <TravelCard data={travel} />
      ))}
    </div>
  );
}

export default TravelsDisplay;
