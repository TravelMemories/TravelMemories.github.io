import React, { useEffect } from "react";
import { PhotoData } from "../../model/PhotoData";
import { motion, useAnimate } from "framer-motion";
import { FormatDate } from "../../helpers/helpers";
import Placeholder from "../../images/placeholder.png";
export enum SlideDirection {
  Left,
  Right,
}

const cardAnimations = [
  {
    rotate: -25,
    scale: 0,
    opacity: 0,
    x: -100,
  },
  {
    rotate: -15,
    scale: 0.3,
    opacity: 0.5,
    x: -250,
  },
  {
    rotate: 0,
    scale: 1,
    opacity: 1,
    x: 0,
  },
  {
    rotate: 15,
    scale: 0.3,
    opacity: 0.5,
    x: 250,
  },
  {
    rotate: 25,
    scale: 0,
    opacity: 0,
    x: 100,
  },
];

interface Props {
  photoData: PhotoData | undefined;
  index: number;
  to: SlideDirection;
}

function SlideshowCard({ photoData, index, to }: Props) {
  const [scope, animate] = useAnimate();
  const slideAnimate = async () => {
    animate(scope.current, cardAnimations[index], {
      duration: 1,
      ease: "easeInOut",
    })
      .then(() => {})
      .catch((e) => {});
  };
  useEffect(() => {
    slideAnimate();
  }, [index]);
  return (
    <motion.div
      ref={scope}
      className={`p-4 pb-8 ${
        photoData ? "bg-background-50" : "opacity-0"
      } mt-10" layout absolute  ${index === 2 ? "" : `-z-10 `}`}
      initial={
        cardAnimations[
          to === SlideDirection.Left
            ? index === 4
              ? 4
              : index + 1
            : index === 0
            ? 0
            : index - 1
        ]
      }
      layout
    >
      {photoData ? (
        <img
          src={photoData.imageSource}
          alt="You photo"
          className="object-cover aspect-square w-[30rem] shadow-md"
        />
      ) : (
        <div className="w-[30rem] aspect-square"></div>
      )}
      <p className="text-primary-950 text-lg">{FormatDate(photoData?.date)}</p>
    </motion.div>
  );
}

export default SlideshowCard;
