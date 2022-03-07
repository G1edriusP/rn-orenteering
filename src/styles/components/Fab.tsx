import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding, SCREEN_WIDTH } from "constants/spacing";

type Props = {
  wrap: ViewStyle;
};

const buttonSize = 56;
export const iconSize = 24;

export default StyleSheet.create<Props>({
  wrap: {
    position: "absolute",
    bottom: padding.MEDIUM,
    right: padding.MEDIUM,
    zIndex: 10,
    height: buttonSize,
    width: buttonSize,
    borderRadius: buttonSize / 2,
    backgroundColor: colors.ORANGE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
