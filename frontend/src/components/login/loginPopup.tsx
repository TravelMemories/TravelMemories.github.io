import React from "react";
interface Props {
  message: string;
}
function LoginPopup({ message }: Props) {
  return (
    <div className="absolute -top-6 -translate-y-[50%] left-[50%] -translate-x-[50%] z-10 bg-secondary-500 text-primary-950 w-5/6 text-center flex items-center justify-center rounded-md py-2 shadow-md overflow-hidden">
      {message}
    </div>
  );
}

export default LoginPopup;
