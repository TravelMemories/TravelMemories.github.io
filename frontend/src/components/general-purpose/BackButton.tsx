import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { cn } from "../../helpers/helpers";
import { motion } from "framer-motion";
interface Props {
  className?: string;
  navigateTo: string;
}
function BackButton({ className, navigateTo }: Props) {
  const navigate = useNavigate();
  return (
    <motion.button
      className={cn(
        "absolute top-5 left-5 flex items-center bg-secondary-100 hover:bg-secondary-200 transition-colors p-1 rounded-full pr-2",
        className
      )}
      onClick={() => {
        navigate(navigateTo);
      }}
      whileHover={{ scale: 1.05 }}
    >
      <MdArrowBackIosNew />
      Back
    </motion.button>
  );
}

export default BackButton;
