import React, { useState } from "react";
import { GoogleMap, MarkerF, Autocomplete } from "@react-google-maps/api";
import { motion } from "framer-motion";
import { IoIosSearch } from "react-icons/io";
import { useMapContext } from "../../context/MapContext";
interface Props {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (lat: number, lng: number, location: string) => void;
}

function LocationPicker({ setVisible, onSelect }: Props) {
  const { isLoaded } = useMapContext();
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLng | null>();
  const [locationAdress, setLocationAdress] = useState("");

  const [autocomplete, setAutocomplete] = useState<
    google.maps.places.Autocomplete | undefined
  >();
  const [customMapLocation, setCustomMapLocation] = useState(false);

  if (!isLoaded) {
    return (
      <div className="z-10 h-[100vh] w-[100vw] fixed left-[50%] translate-x-[-50%] bottom-0 text-5xl text-center">
        Map not available
      </div>
    );
  }
  const closePanel = () => {
    setCustomMapLocation(false);
    setVisible(false);
  };

  return (
    <div className="z-10 h-[100vh] w-[100vw] fixed left-[50%] translate-x-[-50%] bottom-0 flex items-center flex-col justify-center">
      <div
        className="fixed inset-0 bg-black/50 -z-10"
        onClick={(e) => {
          e.stopPropagation();
          closePanel();
        }}
      ></div>
      <div className="bg-background-50 w-fit p-4 rounded-md shadow-md">
        {customMapLocation ? (
          <div className="w-[70vw] h-[80vh]">
            <GoogleMap
              center={
                selectedLocation === null || selectedLocation === undefined
                  ? { lat: 50.2888847, lng: 18.677663 }
                  : selectedLocation
              }
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onClick={(e) => {
                if (e.latLng) {
                  setSelectedLocation(
                    new google.maps.LatLng(e.latLng.lat(), e.latLng.lng())
                  );
                }
              }}
            >
              {selectedLocation && (
                <MarkerF position={selectedLocation}></MarkerF>
              )}
            </GoogleMap>
            <div className="flex items-center justify-center gap-2 w-[30vw] absolute top-20 left-1/2 -translate-x-[50%] bg-background-50 p-4 rounded-md shadow-lg">
              <input
                className="flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md"
                id="location"
                placeholder="Enter location"
                required
                type="text"
                value={locationAdress}
                onChange={(e) => {
                  setLocationAdress(e.target.value);
                }}
              />
              <motion.button
                className="text-sm rounded-md bg-secondary-300 hover:bg-secondary-400 transition-colors p-2"
                whileHover={{ scale: 1.05 }}
                type="button"
                onClick={() => {
                  if (
                    locationAdress === "" ||
                    selectedLocation === undefined ||
                    selectedLocation === null
                  ) {
                    return;
                  }
                  onSelect(
                    selectedLocation.lat(),
                    selectedLocation.lng(),
                    locationAdress
                  );
                  closePanel();
                }}
              >
                Select
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col gap-1">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center justify-center flex-col">
                <div className="flex items-center justify-center gap-2 w-[30vw]">
                  <Autocomplete
                    className="w-full"
                    onLoad={(e) => {
                      setAutocomplete(e);
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
                      if (
                        autocomplete === undefined ||
                        autocomplete.getPlace() === undefined ||
                        autocomplete.getPlace().formatted_address ===
                          undefined ||
                        autocomplete.getPlace().geometry === undefined
                      ) {
                        return;
                      }
                      setSelectedLocation(
                        autocomplete.getPlace().geometry
                          ?.location as google.maps.LatLng
                      );
                      setLocationAdress(
                        autocomplete.getPlace().formatted_address === undefined
                          ? ""
                          : (autocomplete.getPlace()
                              .formatted_address as string)
                      );
                    }}
                  >
                    <IoIosSearch />
                  </motion.button>
                </div>
                <div className="flex items-center w-full text-base mt-2 justify-between">
                  <p className="overflow-hidden flex-1 whitespace-pre-wrap max-w-lg">
                    Selected: <b>{locationAdress}</b>
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    className="bg-secondary-300 hover:bg-secondary-400 transition-colors disabled:bg-primary-700 text-lg px-2 rounded-md shadow-mds"
                    disabled={selectedLocation === null}
                    onClick={() => {
                      if (
                        selectedLocation === null ||
                        selectedLocation === undefined ||
                        locationAdress === ""
                      ) {
                        return;
                      }
                      onSelect(
                        selectedLocation.lat(),
                        selectedLocation.lng(),
                        locationAdress
                      );
                      closePanel();
                    }}
                  >
                    Select
                  </motion.button>
                </div>
                {/* Select button panel */}
              </div>
              {/* Map */}
              <div className="w-40 aspect-square shadow-lg border border-primary-900/30">
                <GoogleMap
                  center={
                    selectedLocation === null || selectedLocation === undefined
                      ? { lat: 50.2888847, lng: 18.677663 }
                      : selectedLocation
                  }
                  zoom={15}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                  }}
                >
                  {selectedLocation !== null && (
                    <MarkerF
                      position={
                        selectedLocation as
                          | google.maps.LatLng
                          | google.maps.LatLngLiteral
                      }
                    />
                  )}
                </GoogleMap>
              </div>
            </div>
            <p className="text-center text-2xl font-bold ">OR</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="button"
              className="bg-action-200 hover:bg-action-300 transition-colors text-xl px-2 py-2 rounded-md shadow-mds"
              onClick={() => {
                setLocationAdress("");
                setSelectedLocation(null);
                setCustomMapLocation(true);
              }}
            >
              Pick custom location
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationPicker;
