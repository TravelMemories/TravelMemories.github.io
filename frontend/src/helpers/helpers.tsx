import dayjs from "dayjs";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const FormatDate = (date: Date | undefined) => {
  return date === undefined ? undefined : dayjs(date).format("MM/DD/YYYY");
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
