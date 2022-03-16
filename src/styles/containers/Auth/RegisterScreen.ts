import { StyleSheet, ViewStyle } from "react-native";

// Constants
import { padding } from "constants/spacing";
import colors from "constants/colors";

type Props = {
  wrap: ViewStyle;
  smallBottomSpacer: ViewStyle;
  mediumBottomSpacer: ViewStyle;
  icon: ViewStyle;
  scroll: ViewStyle;
  content: ViewStyle;
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
  scroll: {
    flex: 1,
    // justifyContent: "space-around",
  },
  icon: {
    flex: 0.3,
    alignItems: "center",
  },
  content: {
    flex: 0.7,
  },
});
