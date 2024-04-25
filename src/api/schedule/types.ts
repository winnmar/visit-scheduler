export type Timeslot = {
  start: string;
  end: string;
  taken?: boolean;
};

export type TimeslotResponse = { Start: string; End: string; Taken?: string };

export type ScheduleVisitPostBody = {
  Start: string;
  End: string;
  Comments: string;
  Patient: { Name: string; SecondName: string; Email: string; Phone: string };
};
