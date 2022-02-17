import { HomeScreenProps } from "constants/navigation/types";
import React, { useEffect } from "react";

// Styles
import styles from "styles/containers/HomeScreen";

// Components
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Utils
import { onSignOutPress } from "utils/firebase/auth";
import { resetNavigation } from "utils/navigation/navigation";

// Constants
import { Routes } from "constants/navigation/routes";
import { removeValue } from "utils/storage";
import { LOCAL_STORAGE_KEYS } from "constants/values";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const onSignOutCallback = async () => {
    navigation.dispatch(resetNavigation(Routes.LOGIN_SCREEN));
    await removeValue(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <Text>Home screen</Text>
      <Button title={"Sign out"} onPress={() => onSignOutPress(onSignOutCallback)} />
    </SafeAreaView>
  );
};

export default HomeScreen;
