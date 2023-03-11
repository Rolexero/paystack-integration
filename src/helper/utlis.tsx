import dayjs from "dayjs";

export const formatDateStr = (
  dateStr: string | number | undefined,
  format?: string
) => {
  return dayjs(dayjs(dateStr)).format(format || "MMM DD, YYYY");
};
