import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

// Constants
import colors from 'constants/colors';
import { fontSizes, padding } from 'constants/spacing';
import { fontMedium, fontRegular } from 'constants/fonts';

type Props = {
  wrap: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  icon: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    padding: padding.MEDIUM,
    backgroundColor: colors.WHITE,
  },
  title: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
    marginBottom: padding.SMALL / 2,
  },
  subtitle: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MIDI,
    color: colors.BLACK,
    marginBottom: padding.SMALL,
  },
  icon: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
