import { format } from "date-fns";

export const formatScheduledDate = (date: string) => {
  return `${format(new Date(date), "EEEE, d MMMM uuuu")} at ${format(
    new Date(date),
    "k:mm"
  )}`;
};
