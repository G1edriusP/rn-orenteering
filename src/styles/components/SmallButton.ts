import colors from "constants/colors";
import { fontMedium } from "constants/fonts";
import { padding } from "constants/spacing";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Styles {
  wrap: ViewStyle;
  time: TextStyle;
}

export default StyleSheet.create<Styles>({
  wrap: {
    backgroundColor: colors.WHITE,
    padding: padding.SMALL,
    borderRadius: padding.SMALL,
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
  time: {
    fontFamily: fontMedium,
    fontSize: 18,
    color: colors.BLACK,
  },
});
