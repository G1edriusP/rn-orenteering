import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

// Constants
import colors from 'constants/colors';
import { fontSizes, padding, SCREEN_WIDTH } from 'constants/spacing';
import { fontMedium, fontRegular } from 'constants/fonts';

type Props = {
  wrap: ViewStyle;
  image: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  valueItemWrap: ViewStyle;
  valueText: TextStyle;
  valuesWrap: ViewStyle;
  markersTitle: TextStyle;
  markerTitle: TextStyle;
  markerDesc: TextStyle;
  markerWrap: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: padding.LARGE,
    shadowColor: colors.BLACK,
    borderTopLeftRadius: padding.LARGE,
    borderTopRightRadius: padding.LARGE,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 8.3,
    elevation: 13,
    zIndex: 20,
  },
  image: {
    backgroundColor: 'orange',
    width: '100%',
    height: SCREEN_WIDTH / 2,
    marginBottom: padding.SMALL,
  },
  title: {
    fontFamily: fontMedium,
    fontSize: 28,
    color: colors.BLACK,
    marginBottom: padding.MIDI,
    marginTop: padding.MEDIUM,
  },
  description: {
    fontFamily: fontRegular,
    fontSize: 16,
    color: colors.BLACK,
    marginBottom: padding.MEDIUM,
  },
  valuesWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.LIGHT_GREY,
    padding: padding.MIDI,
    borderRadius: padding.SMALL,
    marginBottom: padding.MEDIUM + padding.MIDI,
  },
  valueItemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontFamily: fontRegular,
    fontSize: fontSizes.MIDI - 4,
    color: colors.LIGHT_GREEN,
    marginLeft: padding.SMALL,
  },
  markersTitle: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MIDI,
    color: colors.BLACK,
    marginBottom: padding.MEDIUM,
  },
  markerTitle: {
    fontFamily: fontMedium,
    fontSize: fontSizes.SMALL,
    color: colors.DARK_BLUE,
  },
  markerDesc: {
    fontFamily: fontMedium,
    fontSize: fontSizes.SMALL - 2,
    color: colors.DARK_GREY,
  },
  markerWrap: {
    backgroundColor: colors.LIGHT_GREY,
    borderRadius: padding.SMALL,
    padding: padding.SMALL,
    marginBottom: padding.SMALL,
  },
});
