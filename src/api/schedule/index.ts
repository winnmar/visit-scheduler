import http from "../api";
import type { ScheduleVisitPostBody } from "./types";

const urlAvailability = "/availability";

const schedulePath = {
  getWeeklySlots: "GetWeeklySlots",
  bookSlot: "BookSlot",
};

const getWeeklySlots = async (date: string) => {
  return await http.get(
    `${urlAvailability}/${schedulePath.getWeeklySlots}/${date}`
  );
};

const scheduleVisit = async (postBody: ScheduleVisitPostBody) => {
  return await http.post(
    `${urlAvailability}/${schedulePath.bookSlot}`,
    postBody
  );
};

export default {
  getWeeklySlots,
  scheduleVisit,
};
