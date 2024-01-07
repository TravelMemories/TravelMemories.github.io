import React from "react";
import { motion } from "framer-motion";
import ImageCarousel from "../components/home-page/ImageCarousel";
import { NavLink } from "react-router-dom";

function HomePage() {
  const transitionDelay = 0.7;
  const buttonAnimationVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 1.03 },
  };
  const heroAnimationVariants = {
    initial: { opacity: 0, y: 50, scaleX: 1.05 },
    animate: { opacity: 1, y: 0, scaleX: 1 },
  };
  return (
    <div className="sm:gap-60 xl:gap-0 mx-auto h-[100vh] flex flex-col-reverse xl:flex-row items-center justify-center xl:justify-between px-4 sm:px-0 sm:pl-10 py-8 overflow-hidden ">
      <ImageCarousel />
      <div className="flex flex-col items-center justify-center gap-4 cursor-default z-10 w-fit">
        <motion.h1
          className=" font-bold tracking-tighter text-center origin-center text-5xl sm:text-7xl xl:text-8xl"
          variants={heroAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 * transitionDelay, duration: 0.4 }}
          key="home-header"
        >
          Capture Your
        </motion.h1>
        <motion.h1
          className="font-bold tracking-tighter text-center origin-center text-5xl sm:text-7xl xl:text-8xl"
          variants={heroAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 * transitionDelay, duration: 0.4 }}
          key="home-header"
        >
          Travel Memories
        </motion.h1>
        <motion.p
          className="text-lg sm:text-2xl tracking-normal text-center  mx-auto text-primary-950/80 cursor-default sm:max-w-[70%] xl:max-w-[70%] "
          variants={heroAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 * transitionDelay, duration: 0.4 }}
          key="home-p"
        >
          Collect, share and remember your adventures in a space that celebrates
          the essence of exploration.
        </motion.p>
        <motion.div
          className="flex-col gap-4 flex w-fit sm:gap-10 sm:flex-row "
          variants={heroAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 3 * transitionDelay, duration: 0.4 }}
        >
          <motion.button
            className="bg-action-400  hover:bg-action-500 px-10 py-4 text-xl rounded-2xl tracking-tight font-bold text-background-50  shadow-md"
            variants={buttonAnimationVariants}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <NavLink to={"/register"}>Get Started</NavLink>
          </motion.button>
          <motion.button
            className=" bg-background-50 hover:bg-background-100 px-10 py-4 text-xl rounded-2xl tracking-tight font-bold text-primary-950 shadow-md"
            variants={buttonAnimationVariants}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <NavLink to={"/public-memories"}>Learn more</NavLink>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
