import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding } from "constants/spacing";
import { fontLight } from "constants/fonts";

type Props = {
  wrap: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
  },
});
