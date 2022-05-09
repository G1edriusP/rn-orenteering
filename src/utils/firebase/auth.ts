// Components
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import jwtDecode from 'jwt-decode';
import { TFunction } from 'react-i18next';

// Constants
import { EmailAuthData, EmailAuthDataAction } from 'constants/types/types';
import { FirebaseToken } from 'constants/types/auth';

// Utils
import { validateInputFields } from 'utils/validation/auth';
import { showAlert } from 'utils/other';

export const emailAuthReducer = (
  state: EmailAuthData,
  action: EmailAuthDataAction
): EmailAuthData => {
  return { ...state, [action.type]: action.value };
};

export const onLoginPress = (
  data: EmailAuthData,
  t: TFunction,
  callback: () => void
): void => {
  const { isValid, error } = validateInputFields(data, t);

  if (isValid) {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .finally(callback)
      .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
        if (error.code === 'auth/user-not-found') {
          showAlert({
            title: t('errors:userNotFoundTitle'),
            message: t('errors:userNotFoundDesc'),
            cancel: t('errors:goBack'),
          });
        } else if (error.code === 'auth/wrong-password') {
          showAlert({
            title: t('errors:password:faulty'),
            cancel: t('errors:goBack'),
          });
        } else if (error.code === 'auth/too-many-requests') {
          showAlert({
            title: t('errors:tooManyRequestsTitle'),
            message: t('errors:tooManyRequestsDesc'),
            cancel: t('errors:goBack'),
          });
        }
      });
  } else {
    showAlert({
      title: error.title,
      message: error.description,
      cancel: t('errors:goBack'),
    });
    callback();
  }
};

export const onRegisterPress = (
  data: EmailAuthData,
  t: TFunction,
  onSuccess: (user: FirebaseAuthTypes.UserCredential) => void,
  callback: () => void
): void => {
  const { isValid, error } = validateInputFields(data, t);

  if (isValid) {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(onSuccess) // User has been successfully created
      .finally(callback)
      .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          showAlert({
            title: t('errors:userFoundTitle'),
            message: t('errors:userFoundDesc'),
            cancel: t('errors:goBack'),
          });
        }
      });
  } else {
    showAlert({
      title: error.title,
      message: error.description,
      cancel: t('errors:goBack'),
    });
    callback();
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
    console.error('JWT parse failed');
    console.error(e);
    return true;
  }
};
