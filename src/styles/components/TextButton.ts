import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding } from "constants/spacing";

type Props = {
  text: TextStyle;
};

export default StyleSheet.create<Props>({
  text: {
    // fontFamily: "",
    fontSize: fontSizes.EXTRA_SMALL + 2,
    textDecorationLine: "underline",
  },
});
