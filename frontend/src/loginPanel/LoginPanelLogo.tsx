import React from "react";
import { motion } from "framer-motion";

function LoginPanelLogo() {
  const animationVariants = {
    initial: { y: "-200%" },
    animate: { y: 0 },
  };
  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-white max-w-fit mx-auto pb-6 pt-4 px-64 rounded-bl-full rounded-br-full shadow-sm border-2 border-primary-300"
      variants={animationVariants}
      initial="initial"
      animate="animate"
      transition={{ type: "spring", mass: 0.9, damping: 16, stiffness: 75 }}
    >
      <motion.p className="text-5xl font-extralight cursor-default">
        Travel
      </motion.p>
      <motion.p className="text-6xl font-extralight cursor-default">
        Memories
      </motion.p>
    </motion.div>
  );
}

export default LoginPanelLogo;
