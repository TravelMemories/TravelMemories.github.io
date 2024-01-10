import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
function LoginButton() {
  return (
    <motion.button
      className="bg-action-400 whitespace-nowrap px-4 py-1 rounded-2xl tracking-tight text-background-50 shadow-md hover:bg-action-500 transition-colors"
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.01 }}
    >
      <NavLink to={"/login"}>Log in</NavLink>
    </motion.button>
  );
}

export default LoginButton;
