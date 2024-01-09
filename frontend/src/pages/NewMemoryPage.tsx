import React, { useState } from "react";
import { TiLocation } from "react-icons/ti";
import { motion } from "framer-motion";
import { FaMap } from "react-icons/fa";

function NewMemoryPage() {
  //const [file, setFile] = useState<File | undefined>();
  const [image, setImage] = useState<string | undefined>();
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    //setFile(target.files[0]);
    setImage(URL.createObjectURL(target.files[0]));
  };
  const cancelEditing = () => {
    setImage(undefined);
  };
  return (
    <>
      {image === undefined ? (
        <div className="w-full min-h-[100vh] flex flex-col items-center justify-center gap-8 ">
          <h1 className="text-6xl text-primary-900 text-center">
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
              onChange={handleOnChange}
              className="ml-auto cursor-pointer"
            />
          </form>
        </div>
      ) : (
        <form className="w-[40rem] mx-auto bg-background-50 flex items-start flex-col mt-20 p-8 gap-6 shadow-md">
          <img
            src={image}
            alt=""
            className="object-cover aspect-square h-[20rem] rounded-md mx-auto shadow-md"
          />
          <input
            className="flex h-10 w-full bg-background text-sm  file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md"
            id="description"
            placeholder="Enter desription"
            type="text"
          />
          <motion.button
            className="flex text-center justify-center items-center text-2xl gap-2"
            whileHover={{ scale: 1.01 }}
            type="button"
          >
            <p>Select location</p>
            <TiLocation />
          </motion.button>
          <motion.button
            className="flex text-center justify-center items-center text-2xl gap-2"
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
