import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/spacing";
import colors from "constants/colors";
import { padding } from "constants/spacing";

type Props = {
  wrap: ViewStyle;
  smallBottomSpacer: ViewStyle;
  mediumBottomSpacer: ViewStyle;
  icon: ViewStyle;
  scroll: ViewStyle;
  content: ViewStyle;
  languages: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: padding.MEDIUM,
  },
  scroll: {
    flex: 1,
    // justifyContent: "space-around",
  },
  smallBottomSpacer: {
    marginBottom: padding.SMALL,
  },
  mediumBottomSpacer: {
    marginBottom: padding.MEDIUM,
  },
  icon: {
    flex: 0.3,
    alignItems: "center",
  },
  content: {
    flex: 0.7,
  },
  languages: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
