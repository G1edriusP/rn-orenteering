import { StyleSheet, ViewStyle } from 'react-native';

// Constants
import colors from 'constants/colors';
import { padding } from 'constants/spacing';

type Props = {
  wrap: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    padding: padding.MEDIUM,
    backgroundColor: colors.WHITE,
  },
});
