import {
  setInternetCredentials,
  getInternetCredentials,
  resetInternetCredentials,
  Result,
  SharedWebCredentials,
} from 'react-native-keychain';

type KeychainConst = {
  accessToken: string;
};

const Types: KeychainConst = {
  accessToken: 'RN-AUTH_ACCESS-TOKEN',
};

const keychainSetValue = (
  value: string,
  type: string
): Promise<false | Result> => setInternetCredentials(type, type, value);
const keychainRemoveValue = (type: string): Promise<void> =>
  resetInternetCredentials(type);
const keychainGetValue = async (type: string): Promise<string | null> => {
  const result: false | SharedWebCredentials = await getInternetCredentials(
    type
  );
  return result ? result.password : null;
};

export const setValue = async (value: string, type: string): Promise<void> => {
  if (type && value) {
    await keychainSetValue(value, Types[type as keyof KeychainConst]);
  }
};

export const removeValue = async (type: string): Promise<void> => {
  if (type) {
    await keychainRemoveValue(Types[type as keyof KeychainConst]);
  }
};

export const getValue = async (type: string): Promise<string | null> => {
  if (type) {
    return keychainGetValue(Types[type as keyof KeychainConst]);
  }
  return null;
};
