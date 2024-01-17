import React, { useState } from "react";
import { TiLocation } from "react-icons/ti";
import { motion } from "framer-motion";
import { FaMap } from "react-icons/fa";
import { PhotoData } from "../model/PhotoData";
import { PrivacyData } from "../model/PrivacyData";

function NewMemoryPage() {
  //const [file, setFile] = useState<File | undefined>();
  const [image, setImage] = useState<string | undefined>();
  const [newMemory, setNewMemory] = useState<PhotoData | undefined>();
  const handleImageUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    //setFile(target.files[0]);
    setImage(URL.createObjectURL(target.files[0]));
    setNewMemory({
      id: undefined,
      stageId: undefined,
      description: undefined,
      date: new Date(),
      photoData: image,
      privacy: PrivacyData.Private,
    });
  };
  const cancelEditing = () => {
    setImage(undefined);
    setNewMemory(undefined);
  };
  return (
    <>
      {image === undefined ? (
        <div className="container mx-auto min-h-[100vh] flex flex-col items-center justify-center gap-8 ">
          <h1 className=" text-2xl sm:text-5xl text-primary-900 text-center">
            Add new memory
          </h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center gap-2 justify-center max-w-[30rem] w-full bg-background-50 p-4 h-[30rem] rounded-lg border-dashed border-2 border-primary-800"
          >
            <label htmlFor="image" className="text-xl">
              Drag image here
            </label>
            <p>Or</p>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
              className="max-w-full ml-auto cursor-pointer"
              required
            />
          </form>
        </div>
      ) : (
        // Image is uploaded
        <form className="max-w-[40rem] w-full mx-auto bg-background-50 flex items-start flex-col mt-20 p-8 gap-2 shadow-md">
          <img
            src={image}
            alt=""
            className="object-cover aspect-square h-[20rem] rounded-md mx-auto shadow-md mb-4"
          />
          <textarea
            className="flex h-40 w-full bg-background text-lg  file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md resize-none"
            id="description"
            placeholder="Enter desription"
            value={newMemory?.description}
            onChange={(e) => {
              setNewMemory(
                (prev) =>
                  ({ ...prev, description: e.target.value } as PhotoData)
              );
            }}
          />
          <motion.button
            className="flex text-center justify-center items-center text-2xl gap-2 text-primary-950/90"
            whileHover={{ scale: 1.01 }}
            type="button"
          >
            <p>Select location</p>
            <TiLocation />
          </motion.button>
          <motion.button
            className="flex text-center justify-center items-center text-2xl gap-2 text-primary-950/90"
            whileHover={{ scale: 1.01 }}
            type="button"
          >
            <p>Select travel</p>
            <FaMap />
          </motion.button>
          <div className="flex items-center justify-between w-full mt-auto">
            <button
              className="flex text-center text-2xl justify-center items-center gap-2 bg-action-400 hover:bg-action-500 p-2 rounded-lg text-background-50 transition-colors"
              type="button"
            >
              Add
            </button>
            <button
              className="flex text-center justify-center items-center gap-2 bg-secondary-500 hover:bg-secondary-600 p-2 rounded-lg text-background-50 transition-colors"
              type="button"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default NewMemoryPage;
