import React, { useState, useReducer } from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "styles/containers/Auth/RegisterScreen";

// Components
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "components";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

// Utils
import { emailAuthReducer, onRegisterPress } from "utils/firebase/auth";

// Types
import { RegisterScreenProps } from "constants/navigation/types";

// Constants
import { Stacks } from "constants/navigation/routes";
import { defaultEmailRegisterData, IDS } from "constants/values";
import { ScrollView, View } from "react-native";
import { PlusIcon } from "assets/svg";
import colors from "constants/colors";
import firestore from "@react-native-firebase/firestore";

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [data, dispatch] = useReducer(emailAuthReducer, defaultEmailRegisterData);

  const onRegisterCallback = async ({ user }: FirebaseAuthTypes.UserCredential): Promise<void> => {
    setIsLoading(true);
    // Save user data in firebase
    const userData = { uid: user.uid, username: data.username, email: data.email };
    firestore().collection("users").doc(user.uid).set(userData);
    setIsLoading(false);
  };

  const onInputChange = (id: string, text: string): void => {
    dispatch({ type: id, value: text });
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.icon}>
          <PlusIcon size={184} color={colors.ORANGE} />
        </View>
        <View style={styles.content}>
          <TextInput
            id={IDS.EMAIL}
            editable={!isLoading}
            value={data.email}
            placeholder={t("authStack:email")}
            onChangeText={onInputChange}
            keyboardType='email-address'
            autoCapitalize='none'
            style={styles.smallBottomSpacer}
          />
          <TextInput
            id={IDS.USERNAME}
            editable={!isLoading}
            value={data.username}
            placeholder={t("authStack:username")}
            onChangeText={onInputChange}
            autoCapitalize='none'
            style={styles.smallBottomSpacer}
          />
          <TextInput
            id={IDS.PASSWORD}
            editable={!isLoading}
            value={data.password}
            placeholder={t("authStack:password")}
            onChangeText={onInputChange}
            autoCapitalize='none'
            secureTextEntry
            style={styles.smallBottomSpacer}
          />
          <TextInput
            id={IDS.REPEATED_PASSWORD}
            editable={!isLoading}
            value={data.repeatedPassword || ""}
            placeholder={t("authStack:repeatPassword")}
            onChangeText={onInputChange}
            autoCapitalize='none'
            secureTextEntry
            style={styles.mediumBottomSpacer}
          />
          <Button
            title={t("authStack:register")}
            onPress={() => onRegisterPress(data, t, user => onRegisterCallback(user))}
            style={styles.mediumBottomSpacer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
