import React, { memo } from 'react';

// Components
import Svg, { Path } from 'react-native-svg';

type Props = {
  size: number;
  color?: string;
};

const Dropdown: React.FC<Props> = ({ size, color = '#000000' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M11.65,14.65 L8.86,11.86 C8.54,11.54 8.76,11 9.21,11 L14.8,11 C15.25,11 15.47,11.54 15.15,11.85 L12.36,14.64 C12.16,14.84 11.84,14.84 11.65,14.65 L11.65,14.65 Z"
      />
    </Svg>
  );
};

export default memo(Dropdown);
