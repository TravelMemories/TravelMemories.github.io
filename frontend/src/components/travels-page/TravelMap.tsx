import React from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useMapContext } from "../../context/MapContext";
interface Props {
  lat: number;
  lon: number;
}
function TravelMap({ lat, lon }: Props) {
  const { isLoaded } = useMapContext();
  if (!isLoaded) {
    return <p>Map not available</p>;
  }
  return (
    <div className="h-80 aspect-square overflow-hidden rounded-md shadow-lg border-2 border-background-200">
      <GoogleMap
        center={{ lat: lat, lng: lon }}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: false,
        }}
      >
        <MarkerF
          position={{ lat: lat, lng: lon }}
          clickable={false}
          draggable={false}
        />
      </GoogleMap>
    </div>
  );
}

export default TravelMap;
