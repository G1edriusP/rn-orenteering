import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

// Constants
import colors from 'constants/colors';
import { fontSizes, padding } from 'constants/spacing';
import { fontRegular } from 'constants/fonts';

type Props = {
  text: TextStyle;
};

export default StyleSheet.create<Props>({
  text: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    textDecorationLine: 'underline',
  },
});
