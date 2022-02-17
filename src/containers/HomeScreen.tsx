import { HomeScreenProps } from "constants/navigation/types";
import React, { useEffect } from "react";

// Styles
import styles from "styles/containers/HomeScreen";

// Components
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Utils
import { onSignOutPress } from "utils/firebase/auth";
import { resetNavigation } from "utils/navigation";

// Constants
import { Stacks } from "constants/navigation/routes";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const onSignOutCallback = () => {
    navigation.dispatch(resetNavigation(Stacks.AUTH));
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <Text>Home screen</Text>
      <Button title={"Sign out"} onPress={() => onSignOutPress(onSignOutCallback)} />
    </SafeAreaView>
  );
};

export default HomeScreen;
