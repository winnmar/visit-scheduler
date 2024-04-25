import type { TimeslotResponse } from "../schedule/types";

export const mapResponseToLowerCase = (response: Array<TimeslotResponse>) => {
  return response.map((element) => {
    return {
      start: element.Start,
      end: element.End,
      taken: element.Taken || undefined,
    };
  });
};
