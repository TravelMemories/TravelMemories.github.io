import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTravelsContext } from "../context/TravelsContext";
import { TravelData } from "../model/TravelData";
import { FormatDate } from "../helpers/helpers";

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
    <div className="mt-20 flex flex-col items-center bg-background-50 w-[90%] mx-auto">
      <h1 className="text-center text-6xl">
        {travelData?.location} - {FormatDate(travelData?.date)}
      </h1>
      <div className=""></div>
    </div>
  );
}

export default TravelPage;
