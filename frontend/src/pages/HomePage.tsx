import React from "react";
import { motion } from "framer-motion";
import BgImage from "../components/home-page/BgImage";

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
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 cursor-default">
        <motion.h1
          className=" font-bold tracking-tighter text-center origin-center text-5xl sm:text-7xl xl:text-8xl"
          variants={heroAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 * transitionDelay, duration: 0.4 }}
          key="home-header"
        >
          Capture Your Travel Memories
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl tracking-normal text-center  mx-auto text-primary-950/80 cursor-default sm:max-w-[70%] xl:max-w-[50%]"
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
          className="flex-col gap-4 flex w-fit sm:gap-10 sm:flex-row"
          variants={heroAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 3 * transitionDelay, duration: 0.4 }}
        >
          <motion.button
            className="bg-action-400 px-10 py-4 text-xl rounded-2xl tracking-tight font-bold text-background-50  shadow-md"
            variants={buttonAnimationVariants}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Get Started
          </motion.button>
          <motion.button
            className=" bg-background-50 px-10 py-4 text-xl rounded-2xl tracking-tight font-bold text-primary-950 shadow-md"
            variants={buttonAnimationVariants}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
            whileTap="whileTap"
          >
            Learn more
          </motion.button>
        </motion.div>
      </div>
      <BgImage />
    </div>
  );
}

export default HomePage;
