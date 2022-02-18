import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/spacing";
import colors from "constants/colors";
import { padding } from "constants/spacing";

type Props = {
  wrap: ViewStyle;
  listColumn: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    padding: padding.MEDIUM,
  },
  listColumn: {
    justifyContent: "space-evenly",
    paddingBottom: padding.SMALL * 1.5,
  },
});
