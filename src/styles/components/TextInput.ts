import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding } from "constants/spacing";
import { fontRegular } from "constants/fonts";

type Props = {
  input: TextStyle;
  title: TextStyle;
};

export default StyleSheet.create<Props>({
  title: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
  },
  input: {
    paddingVertical: padding.MIDI,
    paddingHorizontal: padding.MEDIUM,
    borderWidth: 1,
    borderColor: colors.DARK_GREEN,
    borderRadius: padding.SMALL,
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
  },
});
