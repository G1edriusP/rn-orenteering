import React from "react";
import { LatLng } from "react-native-maps";
import { MarkerType } from "./firestore";

export type EmailAuthData = {
  email: string;
  username?: string;
  password: string;
  repeatedPassword?: string;
};
export type TrackCardType = {
  onPress: () => void;
  onFavouritePress: (index: number) => void;
} & TrackData;
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
  type: "PUBLIC" | "PRIVATE";
  title: string;
  duration: number;
  relief: "CITY" | "COUNTRYSIDE" | "OFF-ROAD";
  description?: string;
  markers: MarkerType[];
};
export type ItemProps = {
  value: any;
  label?: string;
  onSelect?: (value: string) => void;
  isLast?: boolean;
  isSelected?: boolean;
};

export type EmailAuthDataAction = { type: string; value: string };
export type TrackDataAction = { type: string; value?: string | MarkerType[] };
export type MarkerDataAction = { type: string; value?: string | LatLng };
export type FilterDataAction = { type: string; value?: string };

export type LocalStorageKeys = {
  ACCESS_TOKEN: string;
};

export type Route = {
  key: string;
  title: string;
  tracks: TrackData[];
};

export type TrackInfoHandle = {
  open: (track: TrackData | MarkerType, fromMap?: boolean) => void;
  close: () => void;
};

export type AlertHandle = {
  showAlert: (params: AlertParams) => Promise<void>;
};

export type AlertParams = {
  title?: string;
  message?: string;
  ok?: string;
  cancel?: string;
  onCancel?: void;
  onOk?: () => void;
};

export type Position = {
  latitude: number;
  longitude: number;
  altitude: number;
  timestamp: number;
  accuracy: number;
  speed: number;
  heading: number;
  isFromMockProvider: boolean;
};

export type CardIcons = {
  CITY: React.FunctionComponent<{ color?: string; size: number }>;
  COUNTRYSIDE: React.FunctionComponent<{ color?: string; size: number }>;
  "OFF-ROAD": React.FunctionComponent<{ color?: string; size: number }>;
};

export type Filters = {
  relief: "CITY" | "COUNTRYSIDE" | "OFF-ROAD" | "";
  duration: [0, 60];
  // rating: 4.7
};
