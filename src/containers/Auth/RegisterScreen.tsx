import React, { useState, useReducer } from 'react';
import { useTranslation } from 'react-i18next';

// Styles
import styles from 'styles/containers/Auth/RegisterScreen';

// Components
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button } from 'components';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore';

// Utils
import { emailAuthReducer, onRegisterPress } from 'utils/firebase/auth';

// Types
import { RegisterScreenProps } from 'constants/navigation/types';

// Constants
import { defaultEmailRegisterData, IDS } from 'constants/values';
import { View } from 'react-native';
import { LogoIcon } from 'assets/svg';

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, dispatch] = useReducer(
    emailAuthReducer,
    defaultEmailRegisterData
  );

  const onRegisterButtonPress = () => {
    setIsLoading(true);
    onRegisterPress(
      data,
      t,
      (user) => onRegisterCallback(user),
      () => setIsLoading(false)
    );
  };

  const onRegisterCallback = async ({
    user,
  }: FirebaseAuthTypes.UserCredential): Promise<void> => {
    // Save user data in firebase
    const userData = {
      uid: user.uid,
      username: data.username,
      email: data.email,
    };
    firestore().collection('users').doc(user.uid).set(userData);
  };

  const onInputChange = (id: string, text: string): void => {
    dispatch({ type: id, value: text });
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.icon}>
        <LogoIcon size={48} />
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        <View style={styles.content}>
          <TextInput
            id={IDS.EMAIL}
            editable={!isLoading}
            value={data.email}
            placeholder={t('authStack:email')}
            onChangeText={onInputChange}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.smallBottomSpacer}
          />
          <TextInput
            id={IDS.USERNAME}
            editable={!isLoading}
            value={data.username}
            placeholder={t('authStack:username')}
            onChangeText={onInputChange}
            autoCapitalize="none"
            style={styles.smallBottomSpacer}
          />
          <TextInput
            id={IDS.PASSWORD}
            editable={!isLoading}
            value={data.password}
            placeholder={t('authStack:password')}
            onChangeText={onInputChange}
            autoCapitalize="none"
            secureTextEntry
            style={styles.smallBottomSpacer}
          />
          <TextInput
            id={IDS.REPEATED_PASSWORD}
            editable={!isLoading}
            value={data.repeatedPassword || ''}
            placeholder={t('authStack:repeatPassword')}
            onChangeText={onInputChange}
            autoCapitalize="none"
            secureTextEntry
            style={styles.mediumBottomSpacer}
          />
        </View>
      </KeyboardAwareScrollView>
      <Button
        title={t('authStack:register')}
        onPress={onRegisterButtonPress}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;
