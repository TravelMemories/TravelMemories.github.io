import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../helpers/helpers";
import { motion } from "framer-motion";
import { VariantProps, cva } from "class-variance-authority";

const variants = cva(
  "flex items-center justify-center px-2 py-1 rounded-md shadow-sm transition-colors",
  {
    variants: {
      variant: {
        default: "bg-secondary-100 hover:bg-secondary-200",
        action: "bg-action-200 hover:bg-action-300",
        actionDark: "bg-aciton-300 hover:bg-aciton-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variants> {
  className?: string;
  children?: ReactNode;
  rounded?: boolean;
}

function CustomButton({
  className,
  children,
  variant,
  rounded,
  ...props
}: Props) {
  return (
    <motion.button whileHover={{ scale: 1.05 }}>
      <button
        {...props}
        className={cn(
          variants({ variant, className }),
          `${rounded ? "rounded-full px-2 py-2" : ""}`
        )}
      >
        {children}
      </button>
    </motion.button>
  );
}

export default CustomButton;
