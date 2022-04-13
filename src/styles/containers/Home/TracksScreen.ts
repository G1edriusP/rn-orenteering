import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding, SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/spacing";
import { fontLight } from "constants/fonts";

type Props = {
  tabBarLabel: TextStyle;
  loadingWrap: ViewStyle;
};

export default StyleSheet.create<Props>({
  tabBarLabel: {
    width: "100%",
    margin: padding.SMALL,
    fontSize: fontSizes.MIDI - 2,
    fontFamily: fontLight,
  },
  loadingWrap: {
    ...StyleSheet.absoluteFillObject,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
