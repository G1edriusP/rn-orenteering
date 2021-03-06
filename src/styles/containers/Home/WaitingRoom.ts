import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

// Constants
import colors from 'constants/colors';
import { fontSizes, padding, SCREEN_WIDTH } from 'constants/spacing';
import { fontBold, fontLight, fontMedium, fontRegular } from 'constants/fonts';

type Props = {
  wrap: ViewStyle;
  guestWrap: ViewStyle;
  guestInput: ViewStyle;
  button: ViewStyle;
  topView: ViewStyle;
  bottomView: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  buttons: ViewStyle;
  card: ViewStyle;
  cardTitle: TextStyle;
  columnWrap: ViewStyle;
  joinedList: ViewStyle;
  sheetBackground: ViewStyle;
  sheetWrap: ViewStyle;
  icon: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  guestWrap: {
    flex: 1,
    padding: padding.MEDIUM,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  guestInput: {
    width: SCREEN_WIDTH / 2,
    height: 80,
    textAlign: 'center',
    marginBottom: padding.MIDI,
    fontSize: fontSizes.MIDI + 2,
  },
  topView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: colors.WHITE,
    borderBottomLeftRadius: padding.MIDI,
    borderBottomRightRadius: padding.MIDI,
    padding: padding.MEDIUM,
    marginBottom: padding.MEDIUM,
  },
  bottomView: {
    flex: 1,
    padding: padding.MEDIUM,
  },
  title: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MEDIUM - 4,
  },
  subtitle: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    marginTop: padding.SMALL,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: padding.MEDIUM,
  },
  button: {
    width: SCREEN_WIDTH / 2 - padding.MEDIUM * 1.5,
  },
  card: {
    backgroundColor: colors.SECONDARY_COLOR,
    width: SCREEN_WIDTH / 2 - padding.MEDIUM * 1.5,
    borderRadius: padding.SMALL,
    alignItems: 'center',
    justifyContent: 'center',
    padding: padding.MIDI,
    marginBottom: padding.MEDIUM,
  },
  cardTitle: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
  },
  columnWrap: {
    justifyContent: 'space-between',
  },
  joinedList: {
    marginTop: padding.MEDIUM,
  },
  sheetWrap: {
    paddingHorizontal: padding.MEDIUM,
    paddingBottom: padding.MEDIUM,
  },
  sheetBackground: {
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  icon: {
    // flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
