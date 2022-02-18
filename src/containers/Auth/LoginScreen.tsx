import React, { useState, useReducer } from "react";

// Styles
import styles from "styles/containers/Auth/LoginScreen";

// Components
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "components";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

// Utils
import { emailAuthReducer, onLoginPress } from "utils/firebase/auth";
import { resetNavigation } from "utils/navigation/navigation";
import { setValue } from "utils/storage";

// Types
import { LoginScreenProps } from "constants/navigation/types";

// Constants
import { Routes, Stacks } from "constants/navigation/routes";
import { defaultEmailLoginData, IDS, LOCAL_STORAGE_KEYS } from "constants/values";

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [data, dispatch] = useReducer(emailAuthReducer, defaultEmailLoginData);

  const onLoginCallback = async ({ user }: FirebaseAuthTypes.UserCredential): Promise<void> => {
    setIsLoading(true);
    const token = await user.getIdToken();
    await setValue(token, LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    navigation.dispatch(resetNavigation(Stacks.HOME));
    setIsLoading(false);
  };

  const onInputChange = (id: string, text: string): void => {
    dispatch({ type: id, value: text });
  };

  const onRegisterButtonPress = (): void => navigation.navigate(Routes.REGISTER_SCREEN);

  return (
    <SafeAreaView style={styles.wrap}>
      <TextInput
        id={IDS.EMAIL}
        editable={!isLoading}
        value={data.email}
        placeholder={"El. paštas"}
        onChangeText={onInputChange}
        keyboardType='email-address'
        autoCapitalize='none'
        style={styles.smallBottomSpacer}
      />
      <TextInput
        id={IDS.PASSWORD}
        editable={!isLoading}
        value={data.password}
        placeholder={"Slaptažodis"}
        onChangeText={onInputChange}
        autoCapitalize='none'
        secureTextEntry
        style={styles.mediumBottomSpacer}
      />
      <Button
        title={"Prisijungti"}
        onPress={() => onLoginPress(data, user => onLoginCallback(user))}
        style={styles.mediumBottomSpacer}
      />
      <Button title={"Registracija"} onPress={onRegisterButtonPress} />
    </SafeAreaView>
  );
};

export default LoginScreen;
