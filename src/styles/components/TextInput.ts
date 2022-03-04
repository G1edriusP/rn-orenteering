import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { padding } from "constants/spacing";

type Props = {
  input: TextStyle;
};

export default StyleSheet.create<Props>({
  input: {
    height: 48,
    paddingHorizontal: padding.MEDIUM,
    borderWidth: 1,
    borderColor: colors.DARK_GREEN,
    borderRadius: padding.SMALL,
  },
});
