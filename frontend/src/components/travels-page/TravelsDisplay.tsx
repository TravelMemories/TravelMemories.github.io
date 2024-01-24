import React from "react";
import { useTravelsContext } from "../../context/TravelsContext";
import TravelCard from "./TravelCard";
import { NavLink } from "react-router-dom";
import {motion} from "framer-motion"
import { IoAddCircleOutline } from "react-icons/io5";
export enum TravelDisplayType{
  Display, Select
}
interface Props{
  variant: TravelDisplayType
}
function TravelsDisplay({variant}:Props) {
  const { travels } = useTravelsContext();
  return (
    <div className={`${variant === TravelDisplayType.Select ? "fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[90vw] z-10": "w-full"} sm:h-auto mx-auto bg-background-50 p-8 gap-4 flex sm:flex-row flex-col items-center`}>
      <NavLink to="/new-travel">
          <motion.button
            className="flex items-center justify-center bg-action-200 text-2xl px-4 py-2 w-fit text-primary-950 shadow-md hover:bg-action-300 transition-colors rounded-lg aspect-square"
            whileHover={{ scale: 1.02 }}
          >
            <IoAddCircleOutline className="text-3xl " />
            <p className="whitespace-nowrap">New Travel</p>
          </motion.button>
        </NavLink>
      {travels.length === 0 ? (
        <p className="text-3xl">You don't have any travels yet.</p>
      ) : (
        travels.map((travel) => <TravelCard data={travel} variant={variant} />)
      )}
    </div>
  );
}

export default TravelsDisplay;