import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ImageCarousel from "../components/home-page/ImageCarousel";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function HomePage() {
  const transitionDelay = 0.7;
  const buttonAnimationVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    whileHover: { scale: 1.02 },
    whileTap: { scale: 1.01 },
  };
  const heroAnimationVariants = {
    initial: { opacity: 0, y: 5, scaleX: 1 },
    animate: { opacity: 1, y: 0, scaleX: 1 },
  };
  const { LoginCookies } = useUserContext();
  useEffect(() => {
    LoginCookies();
  }, [LoginCookies]);
  return (
    <div className="gap-32 sm:gap-60 xl:gap-0 mx-auto h-[100vh] flex flex-col-reverse xl:flex-row items-center justify-center xl:justify-between px-4 sm:px-0 py-8 overflow-hidden bg-gradient-to-br from-background-50 to-background-300/50">
      <ImageCarousel />
      <div className="flex flex-col items-center justify-center gap-4 cursor-default z-10 w-fit ">
        <motion.h1
          className="hidden sm:block tracking-tighter text-center origin-center text-5xl sm:text-7xl xl:text-7xl -mb-2"
          variants={heroAnimationVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 * transitionDelay, duration: 0.4 }}
          key="home-header"
        >
          Capture Your
        </motion.h1>
        <motion.h1
          className=" text-center font-bold origin-center text-5xl sm:text-7xl xl:text-8xl"
          variants={heroAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2.3 * transitionDelay, duration: 0.7 }}
          key="home-header"
        >
          Travel Memories
        </motion.h1>
        <motion.p
          className="text-lg sm:text-2xl tracking-normal whitespace-pre-wrap text-center mx-auto text-primary-950/80 cursor-default sm:max-w-[70%] "
          variants={heroAnimationVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 * transitionDelay, duration: 0.7 }}
          key="home-p"
        >
          Collect, share and remember your adventures in a space that celebrates
          the essence of exploration.
        </motion.p>
        <motion.div
          className="flex-col gap-4 flex w-fit sm:gap-10 sm:flex-row "
          variants={heroAnimationVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 * transitionDelay, duration: 0.7 }}
        >
          <motion.button
            className="bg-action-400 w-52 hover:bg-action-500 px-10 py-4 text-xl rounded-2xl tracking-tight font-bold text-background-50  shadow-md transition-colors"
            variants={buttonAnimationVariants}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <NavLink to={"/login"}>Get Started</NavLink>
          </motion.button>
          <motion.button
            className=" bg-background-50 w-52 hover:bg-background-100 px-10 py-4 text-xl rounded-2xl tracking-tight font-bold text-primary-950 shadow-md transition-colors"
            variants={buttonAnimationVariants}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <NavLink to={"/public-memories"}>Discover</NavLink>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
