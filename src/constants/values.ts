import { MarkerType } from "./types/firestore";
import { EmailAuthData, LocalStorageKeys, TrackData } from "./types/types";

export const defaultEmailLoginData: EmailAuthData = {
  email: "",
  password: "",
};

export const defaultEmailRegisterData: EmailAuthData = {
  email: "",
  password: "",
  repeatedPassword: "",
};

export const defaultTrackData: TrackData = {
  title: "",
  description: "",
  markers: [],
};

export const defaultMarkerData: MarkerType = {
  title: "",
  description: "",
  location: { latitude: 0, longitude: 0 },
};

export const IDS = {
  EMAIL: "email",
  PASSWORD: "password",
  REPEATED_PASSWORD: "repeatedPassword",
  TRACK_TITLE: "title",
  TRACK_DESCRIPTION: "description",
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
