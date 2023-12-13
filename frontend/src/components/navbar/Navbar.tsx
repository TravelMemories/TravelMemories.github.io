import React, { useRef, useState, useEffect } from "react";
import NavbarButton, { NavbarButtonProps } from "./NavbarButton";
import { SlGlobe } from "react-icons/sl";
import { motion, useInView } from "framer-motion";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoX } from "react-icons/go";

function Navbar() {
  //const [navbarButtons, setNavbarButtons] = useState<NavbarButtonProps[]>([
  const navbarButtons: NavbarButtonProps[] = [
    {
      text: "Your Memories",
      route: "/memories",
    },
    {
      text: "Society",
      route: "/society",
    },
    {
      text: "Destinations",
      route: "/destinations",
    },
    {
      text: "Profile",
      route: "/profile",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((isMobileMenuOpen) => !isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen && !isInView) setIsMobileMenuOpen(false);
  }, [isInView, isMobileMenuOpen]);

  return (
    <nav className="sticky flex items-center top-0 left-0 right-0 z-50 font-primary w-full border-b bg-white px-4 sm:px-6 lg:px-3 xl:px-6 py-4 sm:py-3">
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
        {navbarButtons.map((button, index) => (
          <NavbarButton key={index} text={button.text} route={button.route} />
        ))}
      </ul>
      <motion.button
        ref={ref}
        className="ml-auto text-3xl lg:hidden cursor-pointer"
        whileHover={{ scaleY: 1.1 }}
        onClick={toggleMobileMenu}
      >
        <RxHamburgerMenu />
      </motion.button>
      {isInView && isMobileMenuOpen && (
        <motion.div className="absolute w-screen h-screen top-0 left-0 bg-black/40 z-50 overflow-hidden">
          <motion.ul
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 top-0 h-full w-1/2 bg-white shadow-md p-4 flex flex-col items-end text-2xl gap-4"
          >
            <motion.button
              className="cursor-pointer text-4xl"
              whileHover={{ scale: 1.1 }}
              onClick={toggleMobileMenu}
            >
              <GoX />
            </motion.button>
            {navbarButtons.map((button, index) => (
              <NavbarButton
                key={index}
                text={button.text}
                route={button.route}
              />
            ))}
          </motion.ul>
        </motion.div>
      )}
    </nav>
  );
}
export default Navbar;
