import React, { useState, useEffect, useReducer } from "react";

// Styles
import styles from "styles/containers/RegisterScreen";

// Components
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "components";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

// Utils
import { emailAuthReducer, onRegisterPress } from "utils/firebase/auth";
import { resetNavigation } from "utils/navigation";

// Types
import { RegisterScreenProps } from "constants/navigation/types";

// Constants
import { Stacks } from "constants/navigation/routes";
import { defaultEmailRegisterData, IDS } from "constants/values";

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [data, dispatch] = useReducer(emailAuthReducer, defaultEmailRegisterData);
  const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.UserCredential | null>(null);

  const onRegisterCallback = (user: FirebaseAuthTypes.UserCredential): void => {
    setIsLoading(true);
    setUserInfo(user);
  };

  const onInputChange = (id: string, text: string): void => {
    dispatch({ type: id, value: text });
  };

  useEffect(() => {
    if (userInfo) {
      navigation.dispatch(resetNavigation(Stacks.HOME));
      setIsLoading(false);
    }
  }, [userInfo]);

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
        style={styles.smallBottomSpacer}
      />
      <TextInput
        id={IDS.REPEATED_PASSWORD}
        editable={!isLoading}
        value={data.repeatedPassword || ""}
        placeholder={"Pakartokite slaptažodį"}
        onChangeText={onInputChange}
        autoCapitalize='none'
        secureTextEntry
        style={styles.mediumBottomSpacer}
      />
      <Button
        title={"Registruotis"}
        onPress={() => onRegisterPress(data, user => onRegisterCallback(user))}
        style={styles.mediumBottomSpacer}
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;
