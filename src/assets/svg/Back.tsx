import React, { memo } from 'react';

// Components
import Svg, { Path } from 'react-native-svg';

// Constants
import colors from 'constants/colors';

type Props = {
  size: number;
  color?: string;
};

const Dropdown: React.FC<Props> = ({ size, color = colors.BLACK }) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' strokeWidth='1.5'>
      <Path fill={color} stroke={color} strokeLinecap='round' strokeLinejoin='round' d='M18.5 12H6m0 0l6-6m-6 6l6 6' />
    </Svg>
  );
};

export default memo(Dropdown);
