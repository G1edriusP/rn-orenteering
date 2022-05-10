import colors from "constants/colors";
import { fontMedium } from "constants/fonts";
import { padding, SCREEN_WIDTH } from "constants/spacing";
import { StyleSheet } from "react-native";

const rangeSliderKnowSize = 32;
export const rangeSliderWidth = SCREEN_WIDTH - 2 * padding.MEDIUM - rangeSliderKnowSize;

export default StyleSheet.create({
  rangeSliderTrack: {
    backgroundColor: "transparent",
  },
  rangeSliderSelected: {
    height: 2,
    backgroundColor: colors.BLACK,
  },
  rangeSliderMarker: {
    backgroundColor: colors.BLACK,
    width: rangeSliderKnowSize,
    height: rangeSliderKnowSize,
    borderRadius: rangeSliderKnowSize / 2,
  },
  rangeSliderBehindTrack: {
    position: "absolute",
    backgroundColor: colors.LIGHT_BROWN,
    width: "100%",
    height: 2,
  },
  rangeSliderWrap: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  rangeSliderRoot: {
    width: "100%",
    justifyContent: "flex-start",
  },
  rangeSliderValue: {
    color: colors.BLACK,
    fontFamily: fontMedium,
    fontSize: 20,
    marginBottom: padding.MEDIUM / 1.5,
  },
});
