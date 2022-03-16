import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding } from "constants/spacing";

type Props = {
  wrap: ViewStyle;
  title: TextStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    height: 48,
    paddingHorizontal: padding.SMALL,
    borderRadius: padding.SMALL,
    backgroundColor: colors.DARK_GREEN,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    // fontFamily: '',
    fontSize: fontSizes.SMALL,
    color: colors.WHITE,
  },
});
