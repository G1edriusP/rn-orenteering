import { EmailAuthData } from "./types";

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
