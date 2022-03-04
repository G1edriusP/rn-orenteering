import { StyleSheet, ViewStyle } from "react-native";

// Constants
import { SCREEN_WIDTH } from "constants/spacing";
import { padding } from "constants/spacing";
import colors from "constants/colors";

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
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    padding: padding.MEDIUM,
    backgroundColor: colors.WHITE,
  },
  smallBottomSpacer: {
    marginBottom: padding.SMALL,
  },
  mediumBottomSpacer: {
    marginBottom: padding.MEDIUM,
  },
  multilineInput: {
    height: 96,
    textAlignVertical: "top",
  },
  addMarker: {
    borderWidth: 1,
    borderRadius: 8,
  },
  addMarkerWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: padding.SMALL,
  },
  locationWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationInput: {
    width: "45%",
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
    marginBottom: padding.MEDIUM,
  },
});
