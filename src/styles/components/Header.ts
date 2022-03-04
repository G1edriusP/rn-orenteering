import colors from "constants/colors";
import { padding } from "constants/spacing";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Styles {
  wrap: ViewStyle;
  button: ViewStyle;
  row: ViewStyle;
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
  },
  button: {
    height: 48,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: padding.MEDIUM,
    backgroundColor: colors.WHITE,
  },
  row: {
    flexDirection: "row",
  },
});
