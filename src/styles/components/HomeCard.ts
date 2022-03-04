import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding, SCREEN_WIDTH } from "constants/spacing";

type Props = {
  wrap: ViewStyle;
  title: TextStyle;
};

const cardWidth = SCREEN_WIDTH / 2 - padding.MEDIUM * 2;

export default StyleSheet.create<Props>({
  wrap: {
    height: cardWidth,
    width: cardWidth,
    padding: padding.MEDIUM,
    borderRadius: padding.SMALL,
    backgroundColor: colors.DARK_GREEN,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  title: {
    // fontFamily: '',
    fontSize: fontSizes.SMALL + 2,
    color: colors.WHITE,
  },
});
