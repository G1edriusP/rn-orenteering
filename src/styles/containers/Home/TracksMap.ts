import { padding, SCREEN_WIDTH } from "constants/spacing";
import { StyleSheet, ViewStyle } from "react-native";

// Constants

type Props = {
  wrap: ViewStyle;
  headerWrap: ViewStyle;
  map: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    padding: padding.MEDIUM,
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
