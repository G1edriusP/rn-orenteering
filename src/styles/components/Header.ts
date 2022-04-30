import colors from "constants/colors";
import { fontBold, fontMedium, fontRegular } from "constants/fonts";
import { fontSizes, padding, SCREEN_WIDTH } from "constants/spacing";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Styles {
  wrap: ViewStyle;
  button: ViewStyle;
  row: ViewStyle;
  title: TextStyle;
  text: TextStyle;
  titleWrap: ViewStyle;
  statusBar: ViewStyle;
}

export default StyleSheet.create<Styles>({
  wrap: {
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
    backgroundColor: colors.WHITE,
    paddingVertical: padding.SMALL / 4,
  },
  button: {
    height: 48,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: colors.WHITE,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: padding.MEDIUM,
  },
  title: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MIDI,
    color: colors.BLACK,
  },
  text: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
  },
  titleWrap: {
    position: "absolute",
    right: 0,
    left: 0,
    alignItems: "center",
    zIndex: -5,
  },
  statusBar: {
    backgroundColor: colors.WHITE,
    width: SCREEN_WIDTH,
    position: "absolute",
  },
});
