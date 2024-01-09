import React from "react";
import TravelsDisplay from "../components/memories-page/TravelsDisplay";
import { motion } from "framer-motion";
import { IoAddCircleOutline } from "react-icons/io5";

function YourMemoriesPage() {
  return (
    <div className="w-full min-h-[100vh] flex flex-col sm:flex-col px-4 lg:px-20 py-4">
      <div className="mt-20 flex sm:flex-row flex-col items-center w-full gap-8 ">
        <motion.button
          className="flex flex-col items-center justify-center bg-action-200 text-2xl px-2 py-4 h-full text-primary-950 shadow-md hover:bg-action-300 transition-colors rounded-lg sm:aspect-square w-full sm:w-auto"
          whileHover={{ scale: 1.02 }}
        >
          <IoAddCircleOutline className="text-3xl " />
          <p className="whitespace-nowrap">New Travel</p>
        </motion.button>
        <div className="w-full">
          <h1 className="text-4xl text-center sm:text-start sm:text-2xl">
            Your travels:
          </h1>
          <TravelsDisplay />
        </div>
      </div>
    </div>
  );
}

export default YourMemoriesPage;
