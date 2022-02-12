import React, { useEffect } from "react";

// Styles
import styles from "styles/containers/SplashScreen";

// Components
import { View, Text } from "react-native";
import { default as Splash } from "react-native-splash-screen";

// Types
import { SplashScreenProps } from "constants/navigation/types";

// Constants
import { Routes, Stacks } from "constants/navigation/routes";

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    Splash.hide();
    navigation.navigate(Stacks.AUTH);
  }, []);

  return (
    <View style={styles.wrap}>
      <Text>Splash screen hidden</Text>
    </View>
  );
};

export default SplashScreen;
