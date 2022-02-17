import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { EmailAuthData, EmailAuthDataAction } from "constants/types";

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
