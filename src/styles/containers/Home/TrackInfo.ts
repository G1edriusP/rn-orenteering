import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/spacing";
import colors from "constants/colors";
import { padding } from "constants/spacing";

type Props = {
  wrap: ViewStyle;
  smallBottomSpacer: ViewStyle;
  mediumBottomSpacer: ViewStyle;
  multilineInput: ViewStyle;
  addMarker: ViewStyle;
  addMarkerWrap: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    padding: padding.MEDIUM,
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
});
