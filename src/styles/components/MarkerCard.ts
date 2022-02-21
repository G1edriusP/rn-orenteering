import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding, SCREEN_WIDTH } from "constants/spacing";

type Props = {
  wrap: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  location: TextStyle;
  trackData: ViewStyle;
};

const cardHeight = 120;
const cardWidth = SCREEN_WIDTH - padding.MEDIUM * 2;

export default StyleSheet.create<Props>({
  wrap: {
    height: cardHeight,
    width: cardWidth,
    padding: padding.MEDIUM,
    borderRadius: padding.SMALL,
    borderWidth: 1,
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  trackData: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    // fontFamily: '',
    fontSize: fontSizes.MEDIUM,
    color: colors.BLACK,
  },
  description: {
    // fontFamily: '',
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
  },
  location: {
    // fontFamily: '',
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
  },
});
