import React, { memo } from 'react';

// Components
import Svg, { Path } from 'react-native-svg';

// Constants
import colors from 'constants/colors';

type Props = {
  size: number;
  color?: string;
};

const Close: React.FC<Props> = ({ size, color = colors.BLACK }) => {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24' strokeWidth='1.5'>
      <Path
        fill={color}
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243'
      />
    </Svg>
  );
};

export default memo(Close);
