// Components
import SplashScreen from "react-native-splash-screen";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import jwtDecode from "jwt-decode";

// Constants
import { EmailAuthData, EmailAuthDataAction } from "constants/types/types";
import { FirebaseToken } from "constants/types/auth";

export const emailAuthReducer = (
  state: EmailAuthData,
  action: EmailAuthDataAction,
): EmailAuthData => {
  return { ...state, [action.type]: action.value };
};

export const onLoginPress = (data: EmailAuthData): void => {
  auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
      console.log(error.code);
    });
};

export const onRegisterPress = (
  data: EmailAuthData,
  onSuccess: (user: FirebaseAuthTypes.UserCredential) => void,
): void => {
  if (data.password === data.repeatedPassword) {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(onSuccess) // User has been successfully created
      .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
        console.log(error.code);
      });
  } else {
    console.log("Passwords do not match!");
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
