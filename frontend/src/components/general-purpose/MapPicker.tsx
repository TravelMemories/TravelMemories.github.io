import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import { motion } from "framer-motion";
import { IoIosSearch } from "react-icons/io";

interface Props {
  setMapVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (lat: number, lng: number, location: string) => void;
}

function MapPicker({ setMapVisible, onSelect }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const [selectedLocation, setSelectedLocation] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | null
  >({ lat: 50.2888847, lng: 18.677663 });
  const [mapCenter, setMapCenter] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({ lat: 50.2888847, lng: 18.677663 });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const [map, setMap] = useState<google.maps.Map>();

  return (
    <div className="z-10 h-[100vh] w-[100vw] fixed left-[50%] translate-x-[-50%] bottom-0">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={(e) => {
          e.stopPropagation();
          setMapVisible(false);
        }}
      ></div>

      {isLoaded ? (
        <div className="h-full w-5/6 mx-auto">
          <GoogleMap
            center={mapCenter}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onClick={(e) => {
              setSelectedLocation(e.latLng);
            }}
            onLoad={(e) => {
              setMap(e);
            }}
            onUnmount={() => {
              setMap(undefined);
            }}
          >
            {selectedLocation !== null && (
              <MarkerF position={selectedLocation} />
            )}
          </GoogleMap>
          <div className="bg-background-50 absolute top-20 z-20 w-[30%] left-[50%] translate-x-[-50%] p-4 pb-2 rounded-md shadow-md ">
            <div className="flex items-center justify-center gap-2 w-full">
              <Autocomplete
                className="w-full"
                onLoad={(e) => {
                  setAutocomplete(e);
                }}
                onPlaceChanged={() => {
                  if (autocomplete === null) return;
                  setSelectedLocation(
                    autocomplete?.getPlace().geometry
                      ?.location as google.maps.LatLng
                  );
                  if (selectedLocation !== null) setMapCenter(selectedLocation);
                }}
              >
                <input
                  className="flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md"
                  id="location"
                  placeholder="Search location"
                  required
                  type="text"
                />
              </Autocomplete>

              <motion.button
                className="text-xl rounded-full bg-background-100 p-2"
                whileHover={{ scale: 1.1 }}
                type="button"
                onClick={() => {
                  if (autocomplete === null) return;
                  setSelectedLocation(
                    autocomplete?.getPlace().geometry
                      ?.location as google.maps.LatLng
                  );

                  setMapCenter(selectedLocation as google.maps.LatLng);
                  map?.panTo(selectedLocation as google.maps.LatLng);
                }}
              >
                <IoIosSearch />
              </motion.button>
            </div>
            <div className="flex items-center w-full text-sm mt-2 justify-between">
              <p className="overflow-hidden flex-1">
                Selected:{" "}
                {selectedLocation === null ||
                autocomplete?.getPlace() === undefined
                  ? ""
                  : autocomplete?.getPlace().formatted_address}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="button"
                className="bg-secondary-300 hover:bg-secondary-400 transition-colors disabled:bg-primary-700 text-lg px-2 rounded-md shadow-mds"
                disabled={selectedLocation === null}
                onClick={() => {
                  if (
                    selectedLocation === null ||
                    autocomplete?.getPlace() === undefined
                  ) {
                    return;
                  }
                  onSelect(
                    (selectedLocation as google.maps.LatLngLiteral).lat,
                    (selectedLocation as google.maps.LatLngLiteral).lng,
                    autocomplete?.getPlace().formatted_address as string
                  );
                  console.log(autocomplete?.getPlace().formatted_address);
                  setMapVisible(false);
                }}
              >
                Select
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-7xl h-full w-5/6 mx-auto">
          Map not available
        </p>
      )}
    </div>
  );
}

export default MapPicker;
