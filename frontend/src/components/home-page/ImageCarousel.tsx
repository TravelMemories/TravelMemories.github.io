import React, { useEffect, useState, useCallback } from "react";
import BgImage from "../home-page/BgImage";
import homeImage1 from "../../images/homeImage1.jpg";
import homeImage2 from "../../images/homeImage2.jpg";
import homeImage3 from "../../images/homeImage3.jpg";
import { motion } from "framer-motion";
import { BackgroundImageProps } from "./BackgroundImageProps";

function ImageCarousel() {
  const [images] = useState<BackgroundImageProps[]>([
    {
      img: homeImage1,
      location: "Ludington, US",
    },
    {
      img: homeImage2,
      location: "Catragena, BO",
    },
    {
      img: homeImage3,
      location: "Dubai, AE",
    },
  ]);

  const shiftIndexes = useCallback(() => {
    setIndexes((prevIndexes) =>
      prevIndexes.map((idx) => (idx === images.length - 1 ? 0 : idx + 1))
    );
  }, [images.length]);

  const [indexes, setIndexes] = useState<number[]>([0]);

  useEffect(() => {
    setIndexes(images.map((_, i) => i));
  }, [images]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      shiftIndexes();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [shiftIndexes]);

  return (
    <motion.ul
      className={`relative w-[30%] mx-auto xl:ml-auto flex items-center justify-center h-20 mb-10 sm:mb-0`}
      style={{ perspective: "100px" }}
    >
      {indexes.map((idx, i) => (
        <motion.li
          layout
          key={i}
          className="absolute origin-center"
          initial={{ rotate: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            rotate: (idx - 1) * 10,
            x: (idx - 1) * 100,
            y: idx === 0 ? 50 : idx * -10,
            z: idx === images.length - 1 ? 10 : 0,
            zIndex: idx,
            opacity: 1 - (images.length - idx - 1) * 0.1,
          }}
          transition={{ type: "spring", mass: 1, damping: 12, spring: 50 }}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateX: [50%]",
          }}
        >
          <BgImage img={images[i].img} location={images[i].location} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default ImageCarousel;
