import { StyleSheet, ViewStyle } from 'react-native';

// Constants
import { padding } from 'constants/spacing';

type Props = {
  wrap: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
