import React, { useEffect, useState } from "react";
import { TravelData } from "../../model/TravelData";
import {
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
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [visiblePhotos, setVisiblePhotos] = useState<(PhotoData | undefined)[]>(
    []
  );
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
      newPhotos[0],
      newPhotos.length <= 1 ? undefined : newPhotos[1],
    ]);
  };

  const nextPhoto = () => {
    if (photoIndex === photos.length - 1) {
      return;
    }
    const newIndex = photoIndex + 1;
    setPhotoIndex(newIndex);
    setVisiblePhotos(() => [
      newIndex - 1 < 0 ? undefined : photos[newIndex - 1],
      photos[newIndex],
      newIndex + 1 >= photos.length ? undefined : photos[newIndex + 1],
    ]);
  };
  const previousPhoto = () => {
    if (photoIndex === 0) {
      return;
    }
    const newIndex = photoIndex - 1;
    setPhotoIndex(newIndex);
    setVisiblePhotos(() => [
      newIndex - 1 < 0 ? undefined : photos[newIndex - 1],
      photos[newIndex],
      newIndex + 1 >= photos.length ? undefined : photos[newIndex + 1],
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
            {FormatDate(visiblePhotos[1]?.parentStage?.date)} -{" "}
            {visiblePhotos[1]?.parentStage?.location}
          </p>
          <div className="w-[95%] flex items-center justify-between">
            <motion.button
              className="text-4xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={previousPhoto}
            >
              <FaAngleDoubleLeft />
            </motion.button>
            <div className="p-4 pb-8 bg-background-50 mt-10">
              <img
                src={visiblePhotos[1]?.imageSource}
                alt="You photo"
                className="object-cover aspect-square w-[30rem] shadow-md"
              />
              <p className="text-primary-950 text-lg">
                {FormatDate(visiblePhotos[1]?.date)}
              </p>
            </div>
            <motion.button
              className="text-4xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextPhoto}
            >
              <FaAngleDoubleRight />
            </motion.button>
          </div>
          <p className="text-3xl mt-10 text-background-100 max-w-full">
            {visiblePhotos[1]?.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Slideshow;
