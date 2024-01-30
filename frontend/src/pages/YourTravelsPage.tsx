import React from "react";
import TravelsDisplay, {
  TravelDisplayType,
} from "../components/travels-page/TravelsDisplay";

function YourTravelsPage() {
  return (
    <div className="w-full min-h-[100vh] flex flex-col px-4 lg:px-20 py-4">
      <div className="mt-20 flex flex-col items-center w-full gap-8 ">
        <div className="w-full">
          <TravelsDisplay variant={TravelDisplayType.Display} />
        </div>
      </div>
    </div>
  );
}

export default YourTravelsPage;
