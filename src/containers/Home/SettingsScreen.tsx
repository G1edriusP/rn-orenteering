import React from 'react';
import { useTranslation } from 'react-i18next';

// Styles
import styles from 'styles/containers/Home/SettingsScreen';

// Components
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types
import { SettingsScreenProps } from 'constants/navigation/types';
import { LANGUAGES } from 'constants/languages';
import { IconButton } from 'components';
import { padding } from 'constants/spacing';
import { LogoIcon } from 'assets/svg';

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = (code: string) => {
    return i18n.changeLanguage(code);
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.icon}>
        <LogoIcon size={48} />
      </View>
      <View style={styles.block}>
        <Text style={styles.subtitle}>{t('settingsScreen:language')}</Text>
        <View style={styles.languages}>
          {LANGUAGES.map(lang => (
            <IconButton
              key={lang.code}
              onPress={() => setLanguage(lang.code)}
              Icon={lang.Icon}
              size={36}
              selected={lang.code === selectedLanguageCode}
              style={{ marginRight: padding.MIDI }}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
