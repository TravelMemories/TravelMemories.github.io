import React from "react";
import { useParams } from "react-router-dom";

function TravelPage() {
  const { id } = useParams();
  return <div>TravelPage {id}</div>;
}

export default TravelPage;
