import { ImageStyle, StyleSheet, ViewStyle } from 'react-native';

// Constants
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/spacing';
import colors from 'constants/colors';

type Props = {
  wrap: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: colors.SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
