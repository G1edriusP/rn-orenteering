import colors from "constants/colors";
import { padding, SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/spacing";
import { StyleSheet, ViewStyle } from "react-native";

// Constants

type Props = {
  wrap: ViewStyle;
  loadingWrap: ViewStyle;
  headerWrap: ViewStyle;
  map: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    padding: padding.MEDIUM,
  },
  loadingWrap: {
    ...StyleSheet.absoluteFillObject,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  headerWrap: {
    position: "absolute",
    paddingHorizontal: padding.MEDIUM,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
