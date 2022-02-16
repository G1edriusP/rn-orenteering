import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { EmailLoginData, EmailLoginDataAction } from "constants/types";

export const emailLoginReducer = (
  state: EmailLoginData,
  action: EmailLoginDataAction,
): EmailLoginData => {
  return { ...state, [action.type]: action.value };
};

export const onLoginPress = (
  data: EmailLoginData,
  onSuccess: (user: FirebaseAuthTypes.UserCredential) => void,
): void => {
  auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(onSuccess) // User has been successfully created
    .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
      console.log(error.code);
    });
};

export const onSignOutPress = (onSuccess: () => void): void => {
  auth()
    .signOut()
    .then(onSuccess)
    .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
      console.log(error.code);
    });
};
