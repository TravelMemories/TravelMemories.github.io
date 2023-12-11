import React from "react";
import NavbarButton from "./NavbarButton";
import { SlGlobe } from "react-icons/sl";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="absolute flex items-center top-0 left-0 right-0 z-50 font-primary w-full border-b bg-white px-6 py-3">
      <motion.div
        animate={{ scale: 1 }}
        whileHover={{
          scale: 1.01,
        }}
        transition={{ duration: 0.2 }}
      >
        <NavLink
          to={"/"}
          className="flex justify-center items-center gap-4 cursor-pointer"
        >
          <SlGlobe className="text-4xl" />
          <p className="text-2xl font-bold">Travel Memories</p>
        </NavLink>
      </motion.div>
      <ul className="flex gap-12 items-center justify-center ml-auto w-auto text-lg">
        <NavbarButton text={"Destinations"} route={"/destinations"} />
        <NavbarButton text={"Memories"} route={"/memories"} />
        <NavbarButton text={"Profile"} route={"/profile"} />
      </ul>
    </nav>
  );
}
export default Navbar;
