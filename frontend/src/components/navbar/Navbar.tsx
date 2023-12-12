import React from "react";
import NavbarButton from "./NavbarButton";
import { SlGlobe } from "react-icons/sl";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  return (
    <nav className="relative flex items-center top-0 left-0 right-0 z-50 font-primary w-full border-b bg-white px-4 sm:px-6 lg:px-3 xl:px-6 py-4 sm:py-3">
      <motion.div
        animate={{ scale: 1 }}
        whileHover={{
          scale: 1.01,
        }}
        transition={{ duration: 0.2 }}
      >
        <NavLink
          to={"/"}
          className="hidden sm:flex justify-center items-center gap-2 xl:gap-4 cursor-pointer"
        >
          <SlGlobe className="text-2xl lg:text-3xl xl:text-4xl" />
          <p className="text-lg lg:text-xl font-bold xl:text-2xl">
            Travel Memories
          </p>
        </NavLink>
      </motion.div>
      <NavLink
        to={"/new-memory"}
        className="absolute left-1/2 translate-x-[-50%]"
      >
        <motion.div className="whitespace-nowrap text-xl text-center bg-primary-400 text-white font-bold py-2 px-8 rounded-full shadow-sm border border-primary-200 origin-center transition cursor-pointer hover:scale-105 hover:bg-primary-500 active:scale-100 sm:text-base xl:text-xl">
          NEW MEMORY
        </motion.div>
      </NavLink>

      <ul className="hidden lg:flex gap-4 items-center justify-center w-auto ml-auto xl:gap-10 xl:text-lg">
        <NavbarButton text={"Your Memories"} route={"/memories"} />
        <NavbarButton text={"Society"} route={"/society"} />
        <NavbarButton text={"Destinations"} route={"/destinations"} />
        <NavbarButton text={"Profile"} route={"/profile"} />
      </ul>
      <motion.button
        className="ml-auto text-3xl lg:hidden cursor-pointer"
        whileHover={{ scaleY: 1.1 }}
      >
        <RxHamburgerMenu />
      </motion.button>
    </nav>
  );
}
export default Navbar;
