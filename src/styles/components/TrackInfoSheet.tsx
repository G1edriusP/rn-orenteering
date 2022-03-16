import { StyleSheet, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { padding } from "constants/spacing";

type Props = {
  wrap: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    zIndex: 20,
  },
});
