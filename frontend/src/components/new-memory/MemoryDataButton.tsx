import React, { ReactNode } from "react";
import { motion } from "framer-motion";
interface Props {
  children: ReactNode[];
  onClick: () => void;
  data: string | undefined;
}
function MemoryDataButton({ children, onClick, data }: Props) {
  return (
    <div className="flex gap-2 w-full items-center text-xl">
      <p className="flex gap-1 items-center text-center text-primary-800 pointer-events-none">
        {children}:
      </p>
      {data === undefined ? (
        <>
          <p className="text-primary-400">None</p>
          <motion.button
            className="text-center text-primary-950 bg-action-100 hover:bg-action-200 transition-colors p-1 px-3 rounded-md shadow-md"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            onClick={onClick}
          >
            Select
          </motion.button>
        </>
      ) : (
        <>
          <p>{data}</p>
          <motion.button
            className="text-center text-primary-950 bg-background-100 hover:bg-background-200 transition-colors p-1 px-3 rounded-md shadow-md text-base"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            onClick={onClick}
          >
            Change
          </motion.button>
        </>
      )}
    </div>
  );
}

export default MemoryDataButton;
