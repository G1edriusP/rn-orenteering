import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding, SCREEN_WIDTH } from "constants/spacing";
import { fontMedium } from "constants/fonts";

type Props = {
  wrap: ViewStyle;
  emptyWrap: ViewStyle;
  title: TextStyle;
  icon: ViewStyle;
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  emptyWrap: {
    height: cardWidth,
    width: cardWidth,
  },
  title: {
    fontFamily: fontMedium,
    fontSize: fontSizes.SMALL + 2,
    color: colors.KHAKI,
  },
  icon: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingTop: padding.MEDIUM,
    paddingRight: padding.SMALL,
    overflow: "hidden",
    borderRadius: padding.SMALL,
  },
});
