// Components
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import jwtDecode from "jwt-decode";
import { TFunction } from "react-i18next";

// Constants
import { EmailAuthData, EmailAuthDataAction } from "constants/types/types";
import { FirebaseToken } from "constants/types/auth";

// Utils
import { validateInputFields } from "utils/validation/auth";
import EventRegister from "utils/eventRegister";

export const emailAuthReducer = (
  state: EmailAuthData,
  action: EmailAuthDataAction,
): EmailAuthData => {
  return { ...state, [action.type]: action.value };
};

export const onLoginPress = (data: EmailAuthData, t: TFunction): void => {
  const { isValid, error } = validateInputFields(data, t);

  if (isValid) {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
        console.log(error.code);
      });
  } else {
    EventRegister.emit("alert", {
      params: {
        title: error.title,
        message: error.description,
        cancel: t("errors:goBack"),
      },
    });
  }
};

export const onRegisterPress = (
  data: EmailAuthData,
  t: TFunction,
  onSuccess: (user: FirebaseAuthTypes.UserCredential) => void,
): void => {
  const { isValid, error } = validateInputFields(data, t);

  if (isValid) {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(onSuccess) // User has been successfully created
      .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
        console.log(error.code);
      });
  } else {
    EventRegister.emit("alert", {
      params: {
        title: error.title,
        message: error.description,
        cancel: t("errors:goBack"),
      },
    });
  }
};

export const onSignOutPress = (): void => {
  auth()
    .signOut()
    .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
      console.log(error.code);
    });
};

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  try {
    const { exp }: FirebaseToken = jwtDecode(token);
    if (exp * 1000 < Date.now()) return true;
    return false;
  } catch (e) {
    console.error("JWT parse failed");
    console.error(e);
    return true;
  }
};
