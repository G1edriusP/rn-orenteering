import colors from 'constants/colors';
import { fontMedium, fontRegular } from 'constants/fonts';
import { fontSizes, padding } from 'constants/spacing';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface Styles {
  wrap: ViewStyle;
  backdrop: ViewStyle;
  alertWrap: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  buttonsWrap: ViewStyle;
  buttonsSpacing: ViewStyle;
  btnWrap: ViewStyle;
  filledButton: ViewStyle;
  dangerButton: ViewStyle;
  filledTitle: ViewStyle;
  dangerTitle: ViewStyle;
}

const cardPadding = 20;

export default StyleSheet.create<Styles>({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    padding: padding.LARGE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  alertWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    padding: cardPadding,
  },
  title: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MEDIUM - 4,
    color: colors.DARK_BLUE,
    textAlign: 'center',
    paddingBottom: cardPadding,
  },
  description: {
    fontFamily: fontRegular,
    fontSize: fontSizes.MIDI - 2,
    color: colors.DARK_GREY,
    textAlign: 'center',
    paddingBottom: cardPadding,
  },
  buttonsWrap: {
    width: '100%',
  },
  buttonsSpacing: {
    height: cardPadding / 2,
  },
  btnWrap: {
    alignItems: 'center',
  },
  filledButton: {
    backgroundColor: colors.SECONDARY_COLOR,
    width: '100%',
    paddingVertical: padding.MIDI,
    borderRadius: padding.SMALL,
  },
  dangerButton: {
    backgroundColor: colors.RED,
    width: '100%',
    paddingVertical: padding.MIDI,
    borderRadius: padding.SMALL,
  },
  filledTitle: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MIDI - 2,
    color: colors.WHITE,
  },
  dangerTitle: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MIDI - 2,
    color: colors.WHITE,
  },
});
