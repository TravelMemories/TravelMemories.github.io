import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const center = { lat: 48, lng: 2 };

function CustomMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });
  if (!isLoaded) {
    return <p>Map not available</p>;
  }
  return (
    <div className="h-80 w-full">
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      ></GoogleMap>
    </div>
  );
}

export default CustomMap;
