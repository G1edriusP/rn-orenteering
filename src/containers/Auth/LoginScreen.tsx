import React, { useState, useReducer } from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "styles/containers/Auth/LoginScreen";

// Components
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, TextButton, IconButton } from "components";

// Utils
import { emailAuthReducer, onLoginPress } from "utils/firebase/auth";

// Types
import { LoginScreenProps } from "constants/navigation/types";

// Constants
import { Routes, Stacks } from "constants/navigation/routes";
import { defaultEmailLoginData, IDS } from "constants/values";
import colors from "constants/colors";
import { PlusIcon } from "assets/svg";
import { LANGUAGES } from "constants/languages";
import { padding } from "constants/spacing";

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [data, dispatch] = useReducer(emailAuthReducer, defaultEmailLoginData);

  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = (code: string) => {
    return i18n.changeLanguage(code);
  };

  const onInputChange = (id: string, text: string): void => {
    dispatch({ type: id, value: text });
  };

  const onRegisterButtonPress = (): void => navigation.navigate(Routes.REGISTER_SCREEN);

  return (
    <SafeAreaView style={styles.wrap} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.languages}>
          {LANGUAGES.map(lang => (
            <IconButton
              key={lang.code}
              onPress={() => setLanguage(lang.code)}
              Icon={lang.Icon}
              size={24}
              selected={lang.code === selectedLanguageCode}
              style={{ marginLeft: padding.SMALL }}
            />
          ))}
        </View>
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
            id={IDS.PASSWORD}
            editable={!isLoading}
            value={data.password}
            placeholder={t("authStack:password")}
            onChangeText={onInputChange}
            autoCapitalize='none'
            secureTextEntry
            style={styles.mediumBottomSpacer}
          />
          <Button
            title={t("authStack:login")}
            onPress={() => onLoginPress(data, t)}
            style={styles.smallBottomSpacer}
          />
          <TextButton
            text={t("authStack:noAccountRegister")}
            onPress={onRegisterButtonPress}
            color={colors.DARK_GREEN}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
