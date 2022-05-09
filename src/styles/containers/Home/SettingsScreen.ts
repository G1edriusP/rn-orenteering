import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

// Constants
import colors from 'constants/colors';
import { fontSizes, padding } from 'constants/spacing';
import { fontMedium } from 'constants/fonts';

type Props = {
  wrap: ViewStyle;
  block: ViewStyle;
  languages: ViewStyle;
  subtitle: TextStyle;
  icon: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    padding: padding.MEDIUM,
    backgroundColor: colors.WHITE,
  },
  block: {
    marginBottom: padding.LARGE,
  },
  languages: {
    flexDirection: 'row',
  },
  subtitle: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MEDIUM,
    color: colors.BLACK,
    marginBottom: padding.SMALL,
  },
  icon: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
