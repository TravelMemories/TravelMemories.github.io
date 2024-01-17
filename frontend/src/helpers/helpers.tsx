import dayjs from "dayjs";

export const FormatDate = (date: Date | undefined) => {
  return date === undefined ? undefined : dayjs(date).format("MM/DD/YYYY");
};
