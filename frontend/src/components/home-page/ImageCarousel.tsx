import React, { useEffect, useState } from "react";
import BgImage from "../home-page/BgImage";
import homeImage1 from "../../images/homeImage1.jpg";
import homeImage2 from "../../images/homeImage2.jpg";
import homeImage3 from "../../images/homeImage3.jpg";
import { motion } from "framer-motion";
import { BackgroundImageProps } from "./BackgroundImageProps";

function ImageCarousel() {
  const [images, setImages] = useState<BackgroundImageProps[]>([
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
  const [indexes, setIndexes] = useState<number[]>([0]);
  useEffect(() => {
    setIndexes(images.map((_, i) => i));
    const intervalId = setInterval(() => {
      shiftIndexes();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const shiftIndexes = () => {
    setIndexes((prevIndexes) => {
      return prevIndexes.map((idx, i) => {
        return (idx = idx === images.length - 1 ? 0 : idx + 1);
      });
    });
  };
  return (
    <motion.ul
      className="hidden relative w-[30%] sm:ml-0 mr-auto sm:mr-20 xl:ml-auto sm:flex items-center justify-center"
      style={{ perspective: "100px" }}
    >
      {indexes.map((idx, i) => (
        <motion.li
          layout
          key={i}
          className="absolute left-0"
          initial={{ rotate: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            rotate: (idx - 1) * 10,
            x: idx * 100,
            y: idx === 0 ? 50 : idx * -10,
            z: idx === images.length - 1 ? 10 : 0,
            zIndex: idx,
            opacity: 1 - (images.length - idx - 1) * 0.1,
          }}
          transition={{ type: "spring", mass: 1, damping: 12, spring: 50 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <BgImage img={images[i].img} location={images[i].location} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default ImageCarousel;
