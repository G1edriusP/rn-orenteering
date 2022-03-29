import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "styles/containers/Home/SettingsScreen";

// Components
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Types
import { SettingsScreenProps } from "constants/navigation/types";

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.wrap}>
      <Text>Settings screen</Text>
    </SafeAreaView>
  );
};

export default SettingsScreen;
