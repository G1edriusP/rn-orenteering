import { LatLng } from "react-native-maps";
import { MarkerType } from "./firestore";

export type EmailAuthData = {
  email: string;
  password: string;
  repeatedPassword?: string;
};
export type TrackCardType = {
  onPress: () => void;
  onFavouritePress: (index: number) => void;
  title?: string;
  description?: string;
};
export type MarkerCardType = {
  onPress: () => void;
  onRemove: (index: number) => void;
  type?: "COGNITIVE" | "INDICATIVE";
  title?: string;
  description?: string;
  location?: LatLng;
};
export type TrackData = {
  id?: string;
  uid?: string;
  type: "COGNITIVE" | "INDICATIVE" | "";
  title: string;
  description: string;
  markers: MarkerType[];
};
export type ItemProps = {
  value: any;
  label: string;
  onSelect?: (value: string) => void;
  isLast?: boolean;
};

export type EmailAuthDataAction = { type: string; value: string };
export type TrackDataAction = { type: string; value?: string | MarkerType[] };
export type MarkerDataAction = { type: string; value?: string | LatLng };

export type LocalStorageKeys = {
  ACCESS_TOKEN: string;
};

export type Route = {
  key: string;
  title: string;
  tracks: TrackData[];
};
