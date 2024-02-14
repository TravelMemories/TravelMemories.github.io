import React, { useEffect, useState } from "react";
import { TravelData } from "../../model/TravelData";
import {
  AnimatePresence,
  AnimationSequence,
  ElementOrSelector,
  Keyframes,
  motion,
  useAnimate,
} from "framer-motion";
import CustomButton from "../general-purpose/CustomButton";
import { PhotoData } from "../../model/PhotoData";
import { FormatDate } from "../../helpers/helpers";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import SlideshowCard, { SlideDirection } from "./SlideshowCard";
interface Props {
  travelData: TravelData;
  onExit: () => void;
}
const fadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

function Slideshow({ travelData, onExit }: Props) {
  const [scope, animate] = useAnimate();
  const [startSlideshow, setStartSlideshow] = useState(false);
  const [lastSlide, setLastSlide] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<SlideDirection>(
    SlideDirection.Left
  );
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [visiblePhotos, setVisiblePhotos] = useState<(PhotoData | undefined)[]>(
    []
  );
  const [indexes, setIndexes] = useState<number[]>([0, 1, 2, 3, 4]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadPhotos = () => {
    const newPhotos: PhotoData[] = [];
    travelData.stages.forEach((s) => {
      s.photos.forEach((photo) => {
        newPhotos.push(photo);
      });
    });
    setPhotos(newPhotos);
    setVisiblePhotos([
      undefined,
      undefined,
      newPhotos[0],
      newPhotos.length < 2 ? undefined : newPhotos[1],
      newPhotos.length < 3 ? undefined : newPhotos[2],
    ]);
  };

  const nextPhoto = () => {
    if (photoIndex === photos.length - 1) {
      return;
    }
    setScrollDirection(SlideDirection.Left);
    const newIndex = photoIndex + 1;
    if (newIndex === photos.length - 1) {
      setLastSlide(true);
    }
    setPhotoIndex(newIndex);

    setIndexes((prev) => [prev[4], prev[0], prev[1], prev[2], prev[3]]);
    setVisiblePhotos((prev) => [
      prev[1],
      prev[2],
      prev[3],
      prev[4],
      newIndex >= photos.length - 2 ? undefined : photos[newIndex + 2],
    ]);
  };
  const previousPhoto = () => {
    if (photoIndex === 0) {
      return;
    }
    setScrollDirection(SlideDirection.Right);
    const newIndex = photoIndex - 1;
    setPhotoIndex(newIndex);
    if (lastSlide) {
      setLastSlide(false);
    }

    setIndexes((prev) => [prev[1], prev[2], prev[3], prev[4], prev[0]]);
    setVisiblePhotos((prev) => [
      newIndex <= 1 ? undefined : photos[newIndex - 2],
      prev[0],
      prev[1],
      prev[2],
      prev[3],
    ]);
  };
  const introAnimation = async () => {
    if (!scope.current) {
      return;
    }
    try {
      await animate(
        scope.current as ElementOrSelector,
        { opacity: 1 },
        { duration: 1.3 }
      );
    } catch (e) {
      console.log(e);
    }
    await delay(2000);
    try {
      await animate(
        "#back" as ElementOrSelector,
        { opacity: 1 },
        { duration: 2 }
      );
    } catch (e) {
      console.log(e);
    }
    try {
      await animate(
        "#your-travel" as ElementOrSelector,
        { opacity: 1 },
        { duration: 2 }
      );
    } catch (e) {
      console.log(e);
    }
    try {
      await animate(
        "#travel-name" as ElementOrSelector,
        { opacity: 1 },
        { duration: 1.5, delay: 1 }
      );
    } catch (e) {
      console.log(e);
    }
    await delay(3000);
    try {
      await animate(
        "#title" as ElementOrSelector,
        { opacity: 0 },
        { duration: 1 }
      );
    } catch (e) {
      console.log(e);
    }
    setStartSlideshow(true);
    return;
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (startSlideshow) {
        nextPhoto();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [startSlideshow, nextPhoto]);

  useEffect(() => {
    introAnimation();
  }, [introAnimation]);

  return (
    <motion.div
      className="fixed w-[100vw] h-[100vh] top-0 z-50 flex items-center justify-center bg-primary-950 p-4"
      ref={scope}
      initial={{ opacity: 0 }}
    >
      <motion.button
        className="absolute top-10 left-10 text-xl origin-center z-10"
        whileHover={{ scale: 1.05 }}
        id="back"
        initial={{ opacity: 0 }}
      >
        <CustomButton
          className="px-6 z-50"
          disableScaleAnimation={true}
          onClick={onExit}
        >
          Exit
        </CustomButton>
      </motion.button>
      {!startSlideshow && (
        <motion.div id="title" className=" pointer-events-none">
          <motion.h1
            id="your-travel"
            initial={{ opacity: 0 }}
            className="text-primary-50 text-8xl font-thin text-center "
          >
            Your travel to:
          </motion.h1>
          <motion.h1
            id="travel-name"
            initial={{ opacity: 0 }}
            className="mt-1 text-background-200 text-6xl text-center"
          >
            {travelData.location}
          </motion.h1>
        </motion.div>
      )}
      {startSlideshow && (
        <motion.div
          className="h-full w-full flex flex-col  text-primary-50 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-center max-w-full truncate">
            {travelData.location}
          </p>
          <p className="text-center max-w-full text-background-200 -mb-2">
            Stage:
          </p>
          <p className="text-center max-w-full truncate text-xl ">
            {FormatDate(photos[photoIndex].parentStage?.date)} -{" "}
            {photos[photoIndex].parentStage?.location}
          </p>
          {/* Img display */}
          <motion.div
            className="w-[95%] flex items-center justify-between relative"
            layout
          >
            {/* Left arrow */}
            <motion.button
              className={`text-4xl z-50 ${photoIndex === 0 ? "opacity-0" : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={previousPhoto}
            >
              <FaAngleDoubleLeft />
            </motion.button>

            <div className="realtive w-[35rem] aspect-square mt-10">
              <div className="ml-8">
                {indexes.map((idx) => (
                  <AnimatePresence>
                    <SlideshowCard
                      key={idx}
                      index={idx}
                      photoData={visiblePhotos[idx]}
                      to={scrollDirection}
                    />
                  </AnimatePresence>
                ))}
              </div>
            </div>

            {/* Right arrow */}
            <motion.button
              className={`text-4xl z-50 ${
                photoIndex === photos.length - 1 ? "opacity-0" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextPhoto}
            >
              <FaAngleDoubleRight />
            </motion.button>
          </motion.div>
          <p className="text-3xl mt-10 text-background-100 max-w-full">
            {photos[photoIndex].description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Slideshow;
