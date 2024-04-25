import { computed, ref, unref } from "vue";
import {
  eachDayOfInterval,
  addDays,
  subDays,
  nextMonday,
  format,
  isToday,
  isSameDay,
  isMonday,
  previousMonday,
  isTomorrow,
  isBefore,
} from "date-fns";
import { defineStore } from "pinia";
import { API } from "../api";
import schedulerConfig from "@/schedulerConfig.json";
import type { Timeslot, TimeslotResponse } from "@/api/schedule/types";

export const useSchedulerStore = defineStore("scheduler", () => {
  const daysOfWeek = ref<Date[]>();
  const pickedDate = ref<Timeslot>();
  const pickedDateToShow = ref<Timeslot>();
  const isLoadingScheduleVisit = ref<boolean>(false);
  const isDateScheduled = ref<boolean>(false);
  const cache = ref<{ [key: string]: Timeslot[] }>({});

  const mapResponseToLowerCase = (response: Array<TimeslotResponse>) => {
    return response.map((element) => {
      return {
        start: element.Start,
        end: element.End,
        taken: element.Taken,
      } as Timeslot;
    });
  };

  const weeklySlots = async (date: Date) => {
    const formattedDate = format(date, "yyyyMMdd");

    if (!cache.value[formattedDate]) {
      try {
        const response = await API.schedule.getWeeklySlots(formattedDate);
        cache.value[formattedDate] = mapResponseToLowerCase(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    return cache.value[formattedDate];
  };

  const getWeek = async (date: Date) => {
    daysOfWeek.value = eachDayOfInterval({
      start: date,
      end: addDays(date, 6),
    });
    if (isToday(date) && !isMonday(date)) {
      await weeklySlots(previousMonday(daysOfWeek.value[0]));
    }
    await weeklySlots(isMonday(date) ? date : nextMonday(daysOfWeek.value[0]));
  };

  const scheduleDate = async (dateObj: Timeslot) => {
    const mappedObj = {
      Start: format(new Date(dateObj.start), "yyyy-MM-dd HH:mm:ss"),
      End: format(new Date(dateObj.end), "yyyy-MM-dd HH:mm:ss"),
      Comments: schedulerConfig.scheduleData.Comments,
      Patient: schedulerConfig.scheduleData.Patient,
    };

    try {
      isLoadingScheduleVisit.value = true;
      await API.schedule.scheduleVisit(mappedObj);
      updateSlot(dateObj);
      setPickedDateToShow();
      isDateScheduled.value = true;
    } catch (error) {
      console.error(error);
    } finally {
      isLoadingScheduleVisit.value = false;
    }
  };

  const updateSlot = (dateObj: Timeslot) => {
    const dateToUpdate = isMonday(new Date(dateObj.start))
      ? new Date(dateObj.start)
      : previousMonday(new Date(dateObj.start));
    const formattedDate = format(dateToUpdate, "yyyyMMdd");
    const updatedCache = cache.value[formattedDate].map((slot: Timeslot) => {
      if (slot.start === dateObj.start) {
        slot.taken = true;
      }
      return slot;
    });
    cache.value[formattedDate] = updatedCache;
  };

  const mappedCache = computed(() => {
    return Object.values(cache.value).flat();
  });

  const schedulerData = computed(() => {
    if (!daysOfWeek.value) return [];
    return daysOfWeek.value.map((calendarDay: Date) => {
      const timeslots = mappedCache.value.filter(
        (timeslot: Timeslot) =>
          isSameDay(new Date(timeslot.start), calendarDay) &&
          !isBefore(new Date(timeslot.start), new Date())
      );
      return {
        calendarDay,
        timeslots,
      };
    });
  });

  const dateToShow = (day: Date) => {
    if (isToday(day)) {
      return "Today";
    }
    if (isTomorrow(day)) {
      return "Tomorrow";
    }
    return format(day, "E");
  };

  const getNextWeek = async () => {
    const lastDayOfWeek = schedulerData.value[6].calendarDay;
    getWeek(addDays(lastDayOfWeek, 1));
  };

  const getPreviousWeek = async () => {
    const firstDayOfWeek = schedulerData.value[0].calendarDay;
    getWeek(subDays(firstDayOfWeek, 7));
  };

  const setPickedDateToShow = () => {
    pickedDateToShow.value = unref(pickedDate.value);
  };

  const updatePickedDate = (timeslot: Timeslot) => {
    pickedDate.value = timeslot;
    isDateScheduled.value = false;
  };

  const canGoBack = computed(() => {
    if (!daysOfWeek.value) return false;
    return !isToday(daysOfWeek.value[0]);
  });

  return {
    canGoBack,
    dateToShow,
    getWeek,
    getNextWeek,
    getPreviousWeek,
    scheduleDate,
    updatePickedDate,
    pickedDateToShow,
    isLoadingScheduleVisit,
    isDateScheduled,
    pickedDate,
    schedulerData,
  };
});
