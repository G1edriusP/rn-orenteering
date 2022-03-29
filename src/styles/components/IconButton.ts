import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding } from "constants/spacing";

type Props = {
  wrap: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: padding.SMALL,
  },
});
