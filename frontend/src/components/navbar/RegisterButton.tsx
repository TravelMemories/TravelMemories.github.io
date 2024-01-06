import React from "react";
import { motion } from "framer-motion";
import { useUserContext } from "../../context/UserContext";

function RegisterButton() {
  const { isLoggedIn, LogIn, LogOut } = useUserContext();
  return (
    <motion.button
      className="bg-background-50 px-4 py-1 rounded-2xl tracking-tight text-primary-950 shadow-md hover:bg-background-100 transition-colors"
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.01 }}
      onClick={() => {
        if (isLoggedIn) LogOut();
        else LogIn();
      }}
    >
      Register
    </motion.button>
  );
}

export default RegisterButton;
