import { LatLng } from "react-native-maps";
import { MarkerType } from "./firestore";

export type EmailAuthData = {
  email: string;
  password: string;
  repeatedPassword?: string;
};
export type MarkerCardType = {
  onPress: () => void;
  title?: string;
  description?: string;
  location?: LatLng;
};
export type TrackData = {
  title: string;
  description: string;
  markers: MarkerCardType[];
};

export type EmailAuthDataAction = { type: string; value: string };
export type TrackDataAction = { type: string; value: string | MarkerType[] };

export type LocalStorageKeys = {
  ACCESS_TOKEN: string;
};
