import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding } from "constants/spacing";
import { fontRegular } from "constants/fonts";

type Props = {
  input: TextStyle;
  title: TextStyle;
  shadow: ViewStyle;
};

export default StyleSheet.create<Props>({
  title: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
  },
  input: {
    backgroundColor: `${colors.PRIMARY_COLOR}10`,
    paddingVertical: padding.MIDI + padding.SMALL / 2,
    paddingHorizontal: padding.MEDIUM,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.DARK_GREY,
    borderRadius: padding.SMALL,
    fontFamily: fontRegular,
    fontSize: fontSizes.MIDI,
    textAlign: "center",
  },
  shadow: {
    backgroundColor: "white",
    shadowColor: colors.DARK_BLUE,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    elevation: 10,
  },
});
