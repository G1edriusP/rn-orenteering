import React, { useState, useReducer } from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "styles/containers/Auth/LoginScreen";

// Components
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, TextButton } from "components";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

// Utils
import { emailAuthReducer, onLoginPress } from "utils/firebase/auth";
import { resetNavigation } from "utils/navigation/navigation";
import { setValue } from "utils/storage";

// Types
import { LoginScreenProps } from "constants/navigation/types";

// Constants
import { Routes, Stacks } from "constants/navigation/routes";
import { defaultEmailLoginData, IDS, LOCAL_STORAGE_KEYS } from "constants/values";
import colors from "constants/colors";
import { PlusIcon } from "assets/svg";
import { LANGUAGES } from "constants/languages";

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [data, dispatch] = useReducer(emailAuthReducer, defaultEmailLoginData);

  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = (code: string) => {
    return i18n.changeLanguage(code);
  };

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
    <SafeAreaView style={styles.wrap} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {LANGUAGES.map(lang => (
          <TextButton key={lang.code} text={lang.label} onPress={() => setLanguage(lang.code)} />
        ))}
        <Text>{selectedLanguageCode}</Text>
        <View style={styles.icon}>
          <PlusIcon size={184} color={colors.ORANGE} />
        </View>
        <View style={styles.content}>
          <TextInput
            id={IDS.EMAIL}
            editable={!isLoading}
            value={data.email}
            placeholder={t("common:email")}
            onChangeText={onInputChange}
            keyboardType='email-address'
            autoCapitalize='none'
            style={styles.smallBottomSpacer}
          />
          <TextInput
            id={IDS.PASSWORD}
            editable={!isLoading}
            value={data.password}
            placeholder={t("common:password")}
            onChangeText={onInputChange}
            autoCapitalize='none'
            secureTextEntry
            style={styles.mediumBottomSpacer}
          />
          <Button
            title={t("common:login")}
            onPress={() => onLoginPress(data, user => onLoginCallback(user))}
            style={styles.smallBottomSpacer}
          />
          <TextButton
            text={t("common:noAccountRegister")}
            onPress={onRegisterButtonPress}
            color={colors.DARK_GREEN}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
