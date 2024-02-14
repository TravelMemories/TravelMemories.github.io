import React from "react";
import { cn } from "../../helpers/helpers";
interface Props {
  message: string;
  className?: string;
}
function LoginPopup({ message, className }: Props) {
  return (
    <div
      className={cn(
        "absolute -top-6 -translate-y-[50%] left-[50%] -translate-x-[50%] z-50 bg-secondary-500 text-primary-950 w-5/6 text-center flex items-center justify-center rounded-md py-2 shadow-lg overflow-hidden border-[0.1px] border-black",
        className
      )}
    >
      {message}
    </div>
  );
}

export default LoginPopup;
