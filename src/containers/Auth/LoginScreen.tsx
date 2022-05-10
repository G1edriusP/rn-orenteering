import React, { useState, useReducer } from 'react';
import { useTranslation } from 'react-i18next';

// Styles
import styles from 'styles/containers/Auth/LoginScreen';

// Components
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, TextButton, IconButton } from 'components';
import { LogoIcon } from 'assets/svg';

// Utils
import { emailAuthReducer, onLoginPress } from 'utils/firebase/auth';

// Types
import { LoginScreenProps } from 'constants/navigation/types';

// Constants
import { Routes } from 'constants/navigation/routes';
import { defaultEmailLoginData, IDS } from 'constants/values';
import colors from 'constants/colors';
import { LANGUAGES } from 'constants/languages';
import { padding } from 'constants/spacing';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, dispatch] = useReducer(emailAuthReducer, defaultEmailLoginData);

  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = (code: string) => {
    return i18n.changeLanguage(code);
  };

  const onInputChange = (id: string, text: string): void => {
    dispatch({ type: id, value: text });
  };

  const onLoginButtonPress = () => {
    setIsLoading(true);
    onLoginPress(data, t, () => setIsLoading(false));
  };

  const onRegisterScreenButtonPress = (): void => navigation.navigate(Routes.REGISTER_SCREEN);

  return (
    <SafeAreaView style={styles.wrap} edges={['top', 'bottom']}>
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

      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={styles.icon}>
          <LogoIcon size={48} />
        </View>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <View style={styles.content}>
            <TextInput
              testID={'email'}
              id={IDS.EMAIL}
              editable={!isLoading}
              value={data.email}
              placeholder={t('authStack:email')}
              onChangeText={onInputChange}
              keyboardType='email-address'
              autoCapitalize='none'
              style={styles.smallBottomSpacer}
            />
            <TextInput
              testID={'password'}
              id={IDS.PASSWORD}
              editable={!isLoading}
              value={data.password}
              placeholder={t('authStack:password')}
              onChangeText={onInputChange}
              autoCapitalize='none'
              secureTextEntry
              style={styles.mediumBottomSpacer}
            />
          </View>
        </KeyboardAwareScrollView>

        <View>
          <Button
            testID={'button'}
            title={t('authStack:login')}
            onPress={onLoginButtonPress}
            style={styles.mediumBottomSpacer}
            isLoading={isLoading}
          />
          <TextButton
            text={t('authStack:noAccountRegister')}
            onPress={onRegisterScreenButtonPress}
            color={colors.DARK_GREEN}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
