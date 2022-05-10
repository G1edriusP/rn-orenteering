import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { formatTimeString, formatSToMsString, formatPickerToS, formatNewTrackTimeToS } from 'utils/time';

it('formatTimeString() should be 00:00:00 given 0', () => {
  expect(formatTimeString(0)).toBe('00:00:00');
});

it('formatTimeString() should be 00:06:00 given 360000', () => {
  expect(formatTimeString(360000)).toBe('00:06:00');
});

it('formatTimeString() should be 00:06:00 given 3600000', () => {
  expect(formatTimeString(3600000)).toBe('01:00:00');
});
