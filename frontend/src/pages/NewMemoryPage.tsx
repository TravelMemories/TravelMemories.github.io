import React, { useState } from "react";

function NewMemoryPage() {
  const [file, setFile] = useState<File | undefined>();
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
    console.log(file);
  };
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center gap-8 ">
      <h1 className="text-6xl text-primary-900 text-center">Add new memory</h1>
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
          className="ml-auto"
        />
      </form>
    </div>
  );
}

export default NewMemoryPage;
