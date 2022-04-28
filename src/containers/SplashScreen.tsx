import React, { useLayoutEffect } from "react";

// Styles
import styles from "styles/containers/SplashScreen";

// Components
import { View, Text, Image } from "react-native";
import Splash from "react-native-splash-screen";
import Logo from "../assets/images/Logo.svg";
import LaunchLogo from "../assets/images/splash_icon.png";

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
      <Image height={200} width={200} source={LaunchLogo} />
    </View>
  );
};

export default SplashScreen;
