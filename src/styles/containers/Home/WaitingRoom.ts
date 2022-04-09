import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding, SCREEN_WIDTH } from "constants/spacing";
import { fontLight } from "constants/fonts";

type Props = {
  wrap: ViewStyle;
  guestWrap: ViewStyle;
  guestInput: ViewStyle;
  button: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    padding: padding.MEDIUM,
  },
  guestWrap: {
    flex: 1,
    padding: padding.MEDIUM,
    justifyContent: "center",
    alignItems: "center",
  },
  guestInput: {
    width: SCREEN_WIDTH / 2,
    height: 80,
    textAlign: "center",
    marginBottom: padding.MIDI,
    fontSize: 20,
  },
  button: {
    width: SCREEN_WIDTH / 2,
  },
});
