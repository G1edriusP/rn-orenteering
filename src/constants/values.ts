import { MarkerType } from "./types/firestore";
import { EmailAuthData, ItemProps, LocalStorageKeys, TrackData } from "./types/types";

export const defaultEmailLoginData: EmailAuthData = {
  email: "",
  password: "",
};

export const defaultEmailRegisterData: EmailAuthData = {
  email: "",
  username: "",
  password: "",
  repeatedPassword: "",
};

export const defaultTrackTypes: Array<ItemProps> = [{ value: "COGNITIVE" }, { value: "INDICATIVE" }];

export const defaultTrackData: TrackData = {
  type: "",
  title: "",
  description: "",
  markers: [],
  uid: "",
};

export const defaultMarkerData: MarkerType = {
  title: "",
  description: "",
  location: { latitude: 0, longitude: 0 },
};

export const IDS = {
  RESET: "RESET",
  EMAIL: "email",
  USERNAME: "username",
  PASSWORD: "password",
  REPEATED_PASSWORD: "repeatedPassword",
  TRACK_TITLE: "title",
  TRACK_TYPE: "type",
  TRACK_DESCRIPTION: "description",
  TRACK_MARKERS: "markers",
  MARKER_TITLE: "title",
  MARKER_DESCRIPTION: "description",
  MARKER_LONGITUDE: "longitude",
  MARKER_LATITUDE: "latitude",
  MARKER_LOCATION: "location",
};

export const LOCAL_STORAGE_KEYS: LocalStorageKeys = {
  ACCESS_TOKEN: "accessToken",
};

export const initialMarkerMapRegion = {
  latitude: 54.8985,
  longitude: 23.9036,
  latitudeDelta: 0.025,
  longitudeDelta: 0.025,
};
