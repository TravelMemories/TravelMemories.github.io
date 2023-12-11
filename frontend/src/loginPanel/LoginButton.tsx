import React from "react";
import { motion } from "framer-motion";
interface Props {
  text: string;
  onClick: () => void;
  shouldAnimate: boolean;
}
function LoginButton({ text, onClick, shouldAnimate }: Props) {
  return (
    <motion.button
      className="bg-primary-400 w-full px-20 py-2 text-4xl border-2 border-primary-300 shadow-md rounded-md text-white"
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.01 }}
    >
      {text}
    </motion.button>
  );
}

export default LoginButton;
