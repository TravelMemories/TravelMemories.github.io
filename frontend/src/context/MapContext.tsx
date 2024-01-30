import React, { ReactNode, createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
interface MapContextProviderProps {
  children: ReactNode;
}
interface MapContextProps {
  isLoaded: boolean;
}

const MapContext = createContext({} as MapContextProps);

export function useMapContext() {
  return useContext(MapContext);
}

export function MapContextProvider({ children }: MapContextProviderProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });
  return (
    <MapContext.Provider value={{ isLoaded }}>{children}</MapContext.Provider>
  );
}
