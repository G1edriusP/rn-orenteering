import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

// Constants
import colors from 'constants/colors';
import { fontSizes, padding, SCREEN_WIDTH } from 'constants/spacing';
import { fontLight, fontMedium, fontRegular } from 'constants/fonts';

type Props = {
  wrap: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  location: TextStyle;
  trackData: ViewStyle;
  image: ViewStyle;
  remove: ViewStyle;
};

const cardHeight = 120;
const cardWidth = SCREEN_WIDTH - padding.MEDIUM * 2;

export default StyleSheet.create<Props>({
  wrap: {
    height: cardHeight,
    width: cardWidth,
    padding: padding.MEDIUM,
    borderRadius: padding.SMALL,
    borderWidth: 1,
    borderColor: colors.DARK_GREEN,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  trackData: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    marginRight: padding.MEDIUM,
  },
  title: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MIDI,
    color: colors.BLACK,
  },
  description: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
  },
  location: {
    fontFamily: fontLight,
    fontSize: fontSizes.EXTRA_SMALL,
    color: colors.BLACK,
  },
  remove: {
    alignSelf: 'flex-start',
    marginLeft: padding.SMALL,
    borderRadius: padding.MEDIUM,
    paddingLeft: 4,
    paddingBottom: 4,
  },
});
