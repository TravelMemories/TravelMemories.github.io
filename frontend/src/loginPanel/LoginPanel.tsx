import React, { useState } from "react";
import { motion } from "framer-motion";
import LoginPanelLogo from "./LoginPanelLogo";
import LoginButton from "./LoginButton";

function LoginPanel() {
  const [animationComplete, setAnimationComplete] = useState(false);
  return (
    <div>
      <LoginPanelLogo />
      <motion.div
        className="flex flex-col items-center justify-center mt-32 w-fit mx-auto gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, staggerChildren: 2 }}
        onAnimationComplete={() => setAnimationComplete(true)}
      >
        <LoginButton
          key="login"
          text="Log In"
          onClick={() => {}}
          shouldAnimate={animationComplete}
        />
        <LoginButton
          key="signup"
          text="Sing Up"
          onClick={() => {}}
          shouldAnimate={animationComplete}
        />
        <motion.button
          key="newHere"
          className="cursor-pointer mt-4 text-gray-900/90 hover:text-black"
          initial={{ scale: 0 }}
          animate={animationComplete ? { scale: 1 } : { scale: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.01 }}
        >
          New here? Check other people memories.
        </motion.button>
      </motion.div>
    </div>
  );
}

export default LoginPanel;
