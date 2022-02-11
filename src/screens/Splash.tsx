import React, { useEffect } from "react";

// Components
import { View, StyleSheet, ViewStyle, Image, ImageStyle, Text } from "react-native";

// Constants
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/values";

// Splash screen
import SplashScreen from "react-native-splash-screen";

type StyleType = {
  wrap: ViewStyle;
  splash: ImageStyle;
};

const styles = StyleSheet.create<StyleType>({
  wrap: {
    flex: 1,
    backgroundColor: "#BCFCFE",
    justifyContent: "center",
    alignItems: "center",
  },
  splash: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
});

export default () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // TODO: Change splash image to other components when fonts are available
  return (
    <View style={styles.wrap}>
      <Text>Splash screen hidden</Text>
      {/* <Image source={{ uri: require("assets/images/launch_screen.png") }} style={styles.splash} /> */}
    </View>
  );
};
