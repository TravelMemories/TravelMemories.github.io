import React from "react";
import TravelsDisplay from "../components/travels-page/TravelsDisplay";
import { motion } from "framer-motion";
import { IoAddCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function YourMemoriesPage() {
  return (
    <div className="w-full min-h-[100vh] flex flex-col px-4 lg:px-20 py-4">
      <div className="mt-20 flex flex-col items-center w-full gap-8 ">
        <NavLink to="/new-travel" className="w-1/2">
          <motion.button
            className="flex items-center justify-center bg-action-200 text-2xl px-4 py-2 h-full text-primary-950 shadow-md hover:bg-action-300 transition-colors rounded-lg w-full"
            whileHover={{ scale: 1.02 }}
          >
            <IoAddCircleOutline className="text-3xl " />
            <p className="whitespace-nowrap">New Travel</p>
          </motion.button>
        </NavLink>
        <div className="w-full">
          <TravelsDisplay />
        </div>
      </div>
    </div>
  );
}

export default YourMemoriesPage;
