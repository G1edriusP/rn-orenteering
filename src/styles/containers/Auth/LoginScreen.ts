import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

// Constants
import { fontSizes, SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/spacing';
import colors from 'constants/colors';
import { padding } from 'constants/spacing';
import { fontMedium } from 'constants/fonts';

type Props = {
  wrap: ViewStyle;
  smallBottomSpacer: ViewStyle;
  mediumBottomSpacer: ViewStyle;
  icon: ViewStyle;
  scroll: ViewStyle;
  content: ViewStyle;
  languages: ViewStyle;
  inputTitle: TextStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: padding.LARGE,
  },
  scroll: {
    flex: 1,
    marginTop: padding.LARGE * 2,
  },
  smallBottomSpacer: {
    marginBottom: padding.SMALL,
  },
  mediumBottomSpacer: {
    marginBottom: padding.MEDIUM,
  },
  icon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {},
  inputTitle: {
    fontFamily: fontMedium,
    fontSize: fontSizes.SMALL,
  },
  languages: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: padding.MEDIUM * 2,
  },
});
