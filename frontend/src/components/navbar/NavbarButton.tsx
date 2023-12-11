import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, NavLinkProps, useLocation } from "react-router-dom";
interface Props {
  text: String;
  route: String;
}
function NavbarButton({ text, route }: Props) {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const checkIfActive = () => {
    setIsActive(location.pathname === route);
  };

  return (
    <motion.div
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
      className="group cursor-pointer"
      onClick={checkIfActive}
    >
      <NavLink to={route as NavLinkProps["to"]}>
        <motion.p
          className={`group ${
            isActive ? "text-black" : "text-gray-800 hover:text-black"
          }  leading-tigh`}
        >
          {text}
          <div
            className={`h-[1px] w-full
                 bg-black
                group-hover:scale-100
               origin-center scale-0  transition-transform`}
          ></div>
        </motion.p>
      </NavLink>
    </motion.div>
  );
}

export default NavbarButton;
