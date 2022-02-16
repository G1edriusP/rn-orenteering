import { ImageStyle, StyleSheet, ViewStyle } from "react-native";

// Constants
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/spacing";

type Props = {
  wrap: ViewStyle;
  splash: ImageStyle;
};

export default StyleSheet.create<Props>({
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
