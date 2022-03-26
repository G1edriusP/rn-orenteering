export type TrackPlayer = {
  uid: string;
  name: string;
  points: number;
};

export type IndicativeTrackRoom = {
  roomID: string;
  trackID: string;
  isStarted: boolean;
  players: TrackPlayer[];
  duration: number;
};

export const emptyTrackRoom: IndicativeTrackRoom = {
  roomID: "",
  trackID: "",
  isStarted: false,
  players: [],
  duration: 3600,
};
