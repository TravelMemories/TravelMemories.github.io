import React, { useRef, useState, useEffect } from "react";
import NavbarButton, { NavbarButtonProps } from "./NavbarButton";
import { SlGlobe } from "react-icons/sl";
import { motion, useInView } from "framer-motion";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoX } from "react-icons/go";
import { useUserContext } from "../../context/UserContext";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";

function Navbar() {
  //const [navbarButtons, setNavbarButtons] = useState<NavbarButtonProps[]>([
  const navbarButtons: NavbarButtonProps[] = [
    {
      text: "Your Memories",
      route: "/memories",
    },
    {
      text: "Discover",
      route: "/public-memories",
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

  const { isLoggedIn } = useUserContext();

  return (
    <nav className="sticky flex items-center top-0 left-0 right-0 z-50 font-primary w-full border-b text-primary-950 bg-background-50 py-4 sm:py-3">
      <div
        className={`flex items-center flex-grow ${
          isLoggedIn ? "max-w-[80%]" : "max-w-[97%] sm:max-w-[80%]"
        } mx-auto`}
      >
        {/* Travel memories logo */}
        <motion.div
          animate={{ scaleX: 1 }}
          whileHover={{
            scaleX: 1.01,
          }}
          transition={{ duration: 0.2 }}
        >
          <NavLink
            to={"/"}
            className="group flex justify-center items-center gap-2 lg:gap-4 cursor-pointer"
          >
            <SlGlobe className="text-2xl lg:text-4xl group-hover:rotate-12 transition-transform" />
            <p className=" sm:text-lg lg:text-2xl font-bold">Travel Memories</p>
          </NavLink>
        </motion.div>
        {/* New memory button */}
        {/* {isLoggedIn && (
        <NavLink
          to={"/new-memory"}
          className="absolute left-1/2 translate-x-[-50%]"
        >
          <motion.div className="whitespace-nowrap text-xl text-center bg-action-400 text-background-50 font-bold py-2 px-8 rounded-full shadow-sm border border-background-100 origin-center transition cursor-pointer hover:scale-105 hover:bg-action-500 active:scale-100 sm:text-base xl:text-xl">
            NEW MEMORY
          </motion.div>
        </NavLink>
      )} */}
        {/* Button list */}
        <ul
          className={`hidden lg:flex items-center justify-center w-auto ml-auto ${
            isLoggedIn ? "gap-10" : "gap-6"
          } text-lg`}
        >
          {/* Navigation buttons */}
          {isLoggedIn &&
            navbarButtons.map((button, index) => (
              <NavbarButton
                key={index}
                text={button.text}
                route={button.route}
              />
            ))}
          <LoginButton />
          {!isLoggedIn && <RegisterButton />}
        </ul>
        {!isLoggedIn && (
          <div className="lg:hidden flex items-center justify-center ml-auto gap-2">
            <LoginButton />
            <RegisterButton />
          </div>
        )}
        {/* Hamburger menu button */}
        <motion.button
          ref={ref}
          className={`ml-auto text-3xl ${
            isLoggedIn ? "lg:hidden" : "hidden"
          } cursor-pointer`}
          whileHover={{ scaleY: 1.1 }}
          onClick={toggleMobileMenu}
        >
          <RxHamburgerMenu />
        </motion.button>
        {/* Hamburger menu */}
        {isInView && isMobileMenuOpen && (
          <motion.div className="absolute w-screen h-screen top-0 left-0 bg-black/40 z-50 overflow-hidden">
            <motion.ul
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 top-0 h-full w-1/2 bg-background-50 shadow-md p-4 flex flex-col items-end text-2xl gap-4 text-right"
            >
              <motion.button
                className="cursor-pointer text-4xl"
                whileHover={{ scale: 1.1 }}
                onClick={toggleMobileMenu}
              >
                <GoX />
              </motion.button>
              {isLoggedIn &&
                navbarButtons.map((button, index) => (
                  <NavbarButton
                    key={index}
                    text={button.text}
                    route={button.route}
                  />
                ))}
              <LoginButton />
              {!isLoggedIn && <RegisterButton />}
            </motion.ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
