export type EmailAuthData = {
  email: string;
  password: string;
  repeatedPassword?: string;
};

export type EmailAuthDataAction = { type: string; value: string };
