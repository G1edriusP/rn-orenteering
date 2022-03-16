import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding } from "constants/spacing";
import { fontLight } from "constants/fonts";

type Props = {
  tabBarLabel: TextStyle;
};

export default StyleSheet.create<Props>({
  tabBarLabel: {
    width: "100%",
    margin: padding.SMALL,
    fontSize: fontSizes.MIDI - 2,
    fontFamily: fontLight,
  },
});
