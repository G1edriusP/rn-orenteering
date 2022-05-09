import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

// Constants
import colors from 'constants/colors';
import { fontSizes, padding } from 'constants/spacing';
import { fontMedium } from 'constants/fonts';

type Props = {
  wrap: ViewStyle;
  title: TextStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    height: 54,
    paddingHorizontal: padding.SMALL,
    backgroundColor: colors.PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: padding.SMALL,
    shadowColor: colors.DARK_BLUE,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 10,
  },
  title: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MIDI,
    color: colors.WHITE,
  },
});
