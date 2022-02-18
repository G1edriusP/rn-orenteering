import { EmailAuthData, LocalStorageKeys } from "./types/types";

export const defaultEmailLoginData: EmailAuthData = {
  email: "",
  password: "",
};

export const defaultEmailRegisterData: EmailAuthData = {
  email: "",
  password: "",
  repeatedPassword: "",
};

export const IDS = {
  EMAIL: "email",
  PASSWORD: "password",
  REPEATED_PASSWORD: "repeatedPassword",
};

export const LOCAL_STORAGE_KEYS: LocalStorageKeys = {
  ACCESS_TOKEN: "accessToken",
};
