import dayjs from "dayjs";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const FormatDate = (date: Date | undefined) => {
  return date === undefined ? undefined : dayjs(date).format("MM/DD/YYYY");
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const FormatLikes = (likes: number ) : string=>{
  return likes >= 1000000 ? (Math.round(likes/1000000*10)/10).toString() + "M" : 
  likes >= 1000 ? (Math.round(likes/1000*10)/10).toString() + "K" : likes.toString();
}