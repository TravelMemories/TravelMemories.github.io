import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTravelsContext } from "../context/TravelsContext";
import { TravelData } from "../model/TravelData";
import { FormatDate } from "../helpers/helpers";
import StagesDisplay from "../components/travels-page/StagesDisplay";
import { TravelStageData } from "../model/TravelStageData";
import { motion } from "framer-motion";
import TravelMap from "../components/travels-page/TravelMap";

function TravelPage() {
  const { id } = useParams();
  const { travels } = useTravelsContext();
  const navigate = useNavigate();

  const [travelData, setTravelData] = useState<TravelData | undefined>();
  useEffect(() => {
    const travel = travels.find((trav) => trav.id === Number(id));
    if (travel === undefined) {
      navigate("/travels");
    } else {
      setTravelData(travel);
    }
  }, [id, navigate, travels]);
  return (
    <div className="mt-20 flex flex-col items-center bg-background-50 w-[90%] mx-auto p-2 gap-8">
      <div className="flex justify-between items-center w-fit mx-auto gap-8">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl">{travelData?.location}</h1>
          <h2 className="text-4xl font-thin">{FormatDate(travelData?.date)}</h2>
          <p className="text-2xl ">{travelData?.description}</p>
        </div>
        <TravelMap
          lat={travelData?.lat as number}
          lon={travelData?.lon as number}
        />
      </div>
      <div className="flex flex-col items-center bg-background-100 rounded-lg pt-3 text-background-600 font-bold w-5/6 mx-auto">
        <div className="text-3xl uppercase">stages:</div>
        <StagesDisplay stages={travelData?.stages as TravelStageData[]} />
      </div>
      <motion.button
        className="flex items-center justify-center bg-secondary-500 text-4xl p-4 h-full text-primary-50 shadow-md hover:bg-secondary-600 transition-colors rounded-full mb-8"
        whileHover={{ scale: 1.02 }}
      >
        Create slideshow
      </motion.button>
    </div>
  );
}

export default TravelPage;
