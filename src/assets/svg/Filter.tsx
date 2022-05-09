import React, { memo } from 'react';

// Components
import Svg, { Path } from 'react-native-svg';

type Props = {
  size: number;
  color?: string;
};

const Filter: React.FC<Props> = ({ size, color = '#000000' }) => {
  return (
    <Svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 3h16a1 1 0 011 1v1.586a1 1 0 01-.293.707l-6.415 6.414a1 1 0 00-.292.707v6.305a1 1 0 01-1.243.97l-2-.5a1 1 0 01-.757-.97v-5.805a1 1 0 00-.293-.707L3.292 6.293A1 1 0 013 5.586V4a1 1 0 011-1z"
      />
    </Svg>
  );
};

export default memo(Filter);
