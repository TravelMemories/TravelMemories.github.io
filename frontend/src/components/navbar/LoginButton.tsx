import React from "react";
import { motion } from "framer-motion";
import { useUserContext } from "../../context/UserContext";
function LoginButton() {
  const { isLoggedIn, LogIn, LogOut } = useUserContext();
  return (
    <motion.button
      className="bg-action-400 whitespace-nowrap px-4 py-1 rounded-2xl tracking-tight text-background-50 shadow-md hover:bg-action-500 transition-colors"
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.01 }}
      onClick={() => {
        if (isLoggedIn) LogOut();
        else LogIn();
      }}
    >
      {isLoggedIn ? "Log out" : "Log in"}
    </motion.button>
  );
}

export default LoginButton;
