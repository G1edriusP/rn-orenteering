import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { padding, SCREEN_WIDTH } from "constants/spacing";
import { fontMedium, fontRegular } from "constants/fonts";

type Props = {
  wrap: ViewStyle;
  image: ViewStyle;
  title: TextStyle;
  description: TextStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: padding.MEDIUM,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    zIndex: 20,
  },
  image: {
    backgroundColor: "orange",
    width: "100%",
    height: SCREEN_WIDTH / 2,
    marginBottom: padding.SMALL,
  },
  title: {
    fontFamily: fontMedium,
    fontSize: 28,
    color: colors.BLACK,
    marginBottom: padding.MIDI,
  },
  description: {
    fontFamily: fontRegular,
    fontSize: 16,
    color: colors.BLACK,
    marginBottom: padding.MIDI,
  },
});
