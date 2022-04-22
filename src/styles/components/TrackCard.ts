import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding, SCREEN_WIDTH } from "constants/spacing";
import { fontMedium, fontRegular } from "constants/fonts";

type Props = {
  wrap: ViewStyle;
  subWrap: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  iconRowWrap: ViewStyle;
  iconWrap: ViewStyle;
};

const width = SCREEN_WIDTH - padding.MEDIUM * 2;

export default StyleSheet.create<Props>({
  wrap: {
    width,
    marginBottom: padding.MEDIUM,
    backgroundColor: colors.KHAKI,
    borderRadius: padding.SMALL,
    padding: padding.MIDI,
  },
  subWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MIDI,
    color: colors.BLACK,
    maxWidth: width - 60,
    marginBottom: padding.SMALL / 2,
  },
  subtitle: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
    maxWidth: width - 60,
  },
  iconRowWrap: {
    flexDirection: "row",
    marginTop: padding.SMALL,
  },
  iconWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: padding.MIDI,
  },
});
