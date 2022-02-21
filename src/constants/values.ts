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

export const IDS = {
  EMAIL: "email",
  PASSWORD: "password",
  REPEATED_PASSWORD: "repeatedPassword",
  TRACK_TITLE: "title",
  TRACK_DESCRIPTION: "description",
};

export const LOCAL_STORAGE_KEYS: LocalStorageKeys = {
  ACCESS_TOKEN: "accessToken",
};
