import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "styles/containers/Home/ProfileScreen";

// Components
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Types
import { ProfileScreenProps } from "constants/navigation/types";

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.wrap}>
      <Text>Profile screen</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
