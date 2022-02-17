// Components
import SplashScreen from "react-native-splash-screen";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

// Constants
import { EmailAuthData, EmailAuthDataAction } from "constants/types";

// Utils
import { resetNavigation } from "utils/navigation/navigation";
import { getValue } from "utils/storage";
import { Routes, Stacks } from "constants/navigation/routes";

export const emailAuthReducer = (
  state: EmailAuthData,
  action: EmailAuthDataAction,
): EmailAuthData => {
  return { ...state, [action.type]: action.value };
};

export const onLoginPress = (
  data: EmailAuthData,
  onSuccess: (user: FirebaseAuthTypes.UserCredential) => void,
): void => {
  auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(onSuccess) // User has been successfully logged in
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

export const onSignOutPress = (onSuccess: () => void): void => {
  auth()
    .signOut()
    .then(onSuccess)
    .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
      console.log(error.code);
    });
};

export const checkIfLoggedIn = async (dispatch: any) => {
  const accessToken = await getValue("accessToken").catch(e => console.log(e));
  if (accessToken) {
    dispatch(resetNavigation(Stacks.HOME));
  } else {
    dispatch(resetNavigation(Routes.LOGIN_SCREEN));
  }
  SplashScreen.hide();
};
