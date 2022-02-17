import React, { useLayoutEffect } from "react";

// Styles
import styles from "styles/containers/SplashScreen";

// Components
import { View, Text } from "react-native";

// Types
import { SplashScreenProps } from "constants/navigation/types";

// Constants
import { checkIfLoggedIn } from "utils/firebase/auth";

const SplashScreen = ({ navigation: { dispatch } }: SplashScreenProps) => {
  useLayoutEffect(() => {
    checkIfLoggedIn(dispatch);
  }, []);

  return (
    <View style={styles.wrap}>
      <Text>Splash screen hidden</Text>
    </View>
  );
};

export default SplashScreen;
