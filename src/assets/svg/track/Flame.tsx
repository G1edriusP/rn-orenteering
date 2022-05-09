import React, { memo } from 'react';

// Components
import Svg, { Path } from 'react-native-svg';

// Constants
import colors from 'constants/colors';

type Props = {
  size: number;
  strokeColor?: string;
  colorOuter?: string;
  colorInner?: string;
  isSelected?: boolean;
};

const Flame: React.FC<Props> = ({
  size,
  strokeColor = colors.BLACK,
  colorOuter = '#E25822',
  colorInner = '#f5c7b2',
  isSelected = false,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      strokeWidth="1.5"
      viewBox="0 0 18 20"
      style={{ aspectRatio: 18 / 20 }}
    >
      <Path
        stroke={strokeColor}
        fill={isSelected ? colorInner : 'transparent'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19c5.05 0 8-2.904 8-7.875C17 6.155 9 1 9 1S1 6.154 1 11.125C1 16.095 3.95 19 9 19z"
      />
      <Path
        stroke={strokeColor}
        fill={isSelected ? colorOuter : 'transparent'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 16c0 2.415 1.79 3 4 3 3.759 0 5-2.5 2.5-7.5C8 16 7.5 9 8 7c-1.5 3-3 5.818-3 9z"
      />
    </Svg>
  );
};

export default memo(Flame);
