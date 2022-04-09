export const formatTimeString = (time: number): string => {
  let seconds: number = Math.floor(time / 1000);
  let minutes: number = Math.floor(time / 60000);
  let hours: number = Math.floor(time / 3600000);

  seconds = seconds - minutes * 60;
  minutes = minutes - hours * 60;

  let formatted: string;

  formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""}${minutes}:${
    seconds < 10 ? 0 : ""
  }${seconds}`;

  return formatted;
};

export const formatSToMsString = (time: number): string => formatTimeString(time * 1000);
