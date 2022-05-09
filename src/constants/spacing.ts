import { Dimensions } from 'react-native';

export const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } =
  Dimensions.get('window');

export const padding = {
  SMALL: 8,
  MIDI: 12,
  MEDIUM: 16,
  LARGE: 24,
};

export const fontSizes = {
  EXTRA_SMALL: 12,
  SMALL: 16,
  MIDI: 20,
  MEDIUM: 28,
  LARGE: 40,
};
