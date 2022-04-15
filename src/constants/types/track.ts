import { MarkerType } from "./firestore";

export type TrackPlayer = {
  uid: string;
  name: string;
  points: number;
  markers: MarkerType[];
  currentIndex: number;
};

export type IndicativeTrackRoom = {
  creatorID: string;
  roomID: string;
  trackID: string;
  isStarted: boolean;
  duration: number;
};

export const emptyTrackRoom: IndicativeTrackRoom = {
  roomID: "",
  trackID: "",
  isStarted: false,
  duration: 3600,
};
