import { IValue } from 'react-native-number-please/dist/src/NumberPlease.interface';

export const formatTimeString = (time: number): string => {
  let seconds: number = Math.floor(time / 1000);
  let minutes: number = Math.floor(time / 60000);
  const hours: number = Math.floor(time / 3600000);

  seconds = seconds - minutes * 60;
  minutes = minutes - hours * 60;

  const formatted = `${hours < 10 ? 0 : ''}${hours}:${
    minutes < 10 ? 0 : ''
  }${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;

  return formatted;
};

export const formatSToMsString = (time: number): string =>
  formatTimeString(time * 1000);

export const formatPickerToS = (time: IValue[]): number => {
  const hours: number = time.find((item) => item.id === 'hours')!.value;
  const minutes = time.find((item) => item.id === 'minutes')!.value;
  return hours * 3600 + minutes * 60;
};

export const formatNewTrackTimeToS = ({
  days,
  hours,
  minutes,
}: {
  days: number;
  hours: number;
  minutes: number;
}): number => {
  const daysToS = days ? days * 24 * 3600 : 0;
  const hoursToS = hours ? hours * 3600 : 0;
  const minsToS = minutes ? minutes * 60 : 0;
  return daysToS + hoursToS + minsToS;
};
