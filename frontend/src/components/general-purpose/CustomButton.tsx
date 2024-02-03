import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../helpers/helpers";
import { motion } from "framer-motion";
import { VariantProps, cva } from "class-variance-authority";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const variants = cva(
  "flex items-center justify-center px-2 py-1 rounded-md shadow-sm transition-colors text-center mx-auto",
  {
    variants: {
      variant: {
        default: "bg-secondary-100 hover:bg-secondary-200",
        action: "bg-action-200 hover:bg-action-300",
        actionDark: "bg-action-300 hover:bg-action-400",
        edit: "bg-action-200 hover:bg-action-300 gap-1 rounded-full px-3",
        delete: "bg-red-200 hover:bg-red-300 gap-1 rounded-full px-3",
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
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.01 }}
      className="w-full mx-auto"
    >
      <button
        {...props}
        className={cn(
          variants({ variant, className }),
          `${rounded ? "rounded-full px-2 py-2 " : ""}`
        )}
      >
        {variant === "edit" && (
          <>
            <p>Edit</p>
            <FaRegEdit />
          </>
        )}
        {variant === "delete" && (
          <>
            <p>Delete</p>
            <MdDeleteOutline />
          </>
        )}
        {children}
      </button>
    </motion.button>
  );
}

export default CustomButton;
