import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import { fontSizes, SCREEN_WIDTH } from "constants/spacing";
import { padding } from "constants/spacing";
import colors from "constants/colors";
import { fontMedium, fontRegular } from "constants/fonts";

type Props = {
  wrap: ViewStyle;
  smallBottomSpacer: ViewStyle;
  mediumBottomSpacer: ViewStyle;
  multilineInput: ViewStyle;
  addMarker: ViewStyle;
  addMarkerWrap: ViewStyle;
  locationWrap: ViewStyle;
  locationInput: ViewStyle;
  markerMap: ViewStyle;
  markerFixed: ViewStyle;
  dropdown: ViewStyle;
  title: TextStyle;
  sheetBackground: ViewStyle;
  subtitle: TextStyle;
  sheetScrollWrap: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    padding: padding.MEDIUM,
    backgroundColor: colors.WHITE,
  },
  sheetScrollWrap: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: padding.MEDIUM,
  },
  smallBottomSpacer: {
    marginBottom: padding.MIDI,
  },
  mediumBottomSpacer: {
    marginBottom: padding.LARGE,
  },
  multilineInput: {
    height: 96,
    textAlignVertical: "top",
    paddingTop: padding.SMALL,
  },
  addMarker: {
    borderRadius: padding.MEDIUM,
    backgroundColor: colors.DARK_GREEN,
  },
  addMarkerWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: padding.MIDI,
  },
  locationWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: padding.SMALL,
  },
  locationInput: {
    width: "46%",
  },
  markerMap: {
    height: 192,
    width: SCREEN_WIDTH - padding.MEDIUM * 2,
    marginVertical: padding.SMALL,
  },
  markerFixed: {
    left: "50%",
    top: "50%",
    marginLeft: -11.6546762588,
    marginTop: -36,
    position: "absolute",
  },
  dropdown: {
    marginBottom: padding.MIDI,
  },
  title: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MEDIUM,
    color: colors.BLACK,
  },
  sheetBackground: {
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  subtitle: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
  },
});
