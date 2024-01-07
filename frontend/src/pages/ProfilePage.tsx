import React from "react";
import placeholder from "../images/placeholder.svg";

function ProfilePage() {
  return (
     <section className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-3">
          <div className="flex flex-col justify-center space-y-4">
            <img
              alt=""
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
              height="300"
              src={placeholder}
              width="300"
            />
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Image 1 description. This is a captivating description that provides context and relates to the image.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <img
              alt=""
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
              height="300"
              src={placeholder}
              width="300"
            />
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Image 2 description. This is a captivating description that provides context and relates to the image.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <img
              alt=""
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
              height="300"
              src={placeholder}
              width="300"
            />
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Image 3 description. This is a captivating description that provides context and relates to the image.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage;
