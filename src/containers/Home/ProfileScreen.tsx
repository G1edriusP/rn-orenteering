import React from 'react';
import { useTranslation } from 'react-i18next';

// Styles
import styles from 'styles/containers/Home/ProfileScreen';

// Components
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types
import { ProfileScreenProps } from 'constants/navigation/types';
import firebase from '@react-native-firebase/auth';
import { LogoIcon } from 'assets/svg';

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { t } = useTranslation();
  const user = firebase().currentUser;

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.icon}>
        <LogoIcon size={48} />
      </View>
      <Text style={styles.title}>{t('profileScreen:email')}</Text>
      <Text style={styles.subtitle}>{user?.email}</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
