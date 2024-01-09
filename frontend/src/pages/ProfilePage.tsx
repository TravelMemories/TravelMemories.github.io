import React from "react";
import placeholder from "../images/placeholder.svg";
import LogoutButton from "../components/navbar/LogoutButton";

function ProfilePage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <section className="w-full min-h-[90vh] flex justify-center items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-3">
            <div className="flex flex-col justify-center space-y-4">
              <img
                alt=""
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-md border-2"
                height="300"
                src={placeholder}
                width="300"
              />
              <p className="max-w-[600px] text-primary-900/50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Image 1 description. This is a captivating description that
                provides context and relates to the image.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <img
                alt=""
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-md border-2"
                height="300"
                src={placeholder}
                width="300"
              />
              <p className="max-w-[600px] text-primary-900/50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Image 2 description. This is a captivating description that
                provides context and relates to the image.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <img
                alt=""
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-md border-2"
                height="300"
                src={placeholder}
                width="300"
              />
              <p className="max-w-[600px] text-primary-900/50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Image 3 description. This is a captivating description that
                provides context and relates to the image.
              </p>
            </div>
          </div>
        </div>
      </section>
      <LogoutButton />
    </div>
  );
}

export default ProfilePage;
