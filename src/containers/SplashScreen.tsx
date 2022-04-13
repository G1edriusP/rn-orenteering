import React, { useLayoutEffect } from "react";

// Styles
import styles from "styles/containers/SplashScreen";

// Components
import { View, Text } from "react-native";
import Splash from "react-native-splash-screen";

// Types
import { SplashScreenProps } from "constants/navigation/types";

// Constants
import { firebase } from "@react-native-firebase/auth";
import { resetNavigation } from "utils/navigation/navigation";
import { Routes, Stacks } from "constants/navigation/routes";

const SplashScreen = ({ navigation: { navigate, dispatch } }: SplashScreenProps) => {
  useLayoutEffect(() => {
    firebase.auth().onIdTokenChanged(user => {
      if (user) navigate(Stacks.HOME);
      else dispatch(resetNavigation([{ name: Routes.LOGIN_SCREEN }]));
      Splash.hide();
    });
  }, []);

  return (
    <View style={styles.wrap}>
      <Text>Splash screen hidden</Text>
    </View>
  );
};

export default SplashScreen;
