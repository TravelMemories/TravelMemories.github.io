import React from "react";
import { motion } from "framer-motion";

function Home() {
  const logoAnimation = {
    initial: { scale: 0 },
    visible: { scale: 1 },
  };
  const logoTransition = {
    delay: 0.5,
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 2,
  };
  return (
    <motion.div className="w-[100vw] h-[100vh] flex items-center justify-center flex-col">
      <motion.p
        className="text-8xl font-extralight cursor-default"
        variants={logoAnimation}
        initial="initial"
        animate="visible"
        transition={{ ...logoTransition, delay: 0.5 }}
      >
        Travel
      </motion.p>
      <motion.p
        className="text-8xl font-extralight cursor-default"
        variants={logoAnimation}
        initial="initial"
        animate="visible"
        transition={{ ...logoTransition, delay: 1.5 }}
      >
        Memories
      </motion.p>
    </motion.div>
  );
}

export default Home;
