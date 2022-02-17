import { StyleSheet, ViewStyle } from "react-native";

// Constants
import { padding } from "constants/spacing";

type Props = {
  wrap: ViewStyle;
  smallBottomSpacer: ViewStyle;
  mediumBottomSpacer: ViewStyle;
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
});
