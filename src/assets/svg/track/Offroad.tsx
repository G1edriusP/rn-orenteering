import React, { memo } from 'react';

// Components
import Svg, { Path } from 'react-native-svg';

// Constants
import colors from 'constants/colors';

type Props = {
  size: number;
  color?: string;
};

const Offroad: React.FC<Props> = ({ size, color = colors.DARK_GREEN }) => {
  return (
    <Svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h8M7 14h1M16 14h1"
      />
      <Path
        stroke={color}
        d="M3 18v-6.59a2 2 0 01.162-.787l2.319-5.41A2 2 0 017.319 4h9.362a2 2 0 011.838 1.212l2.32 5.41a2 2 0 01.161.789V18M3 18v2.4a.6.6 0 00.6.6h2.8a.6.6 0 00.6-.6V18m-4 0h4m14 0v2.4a.6.6 0 01-.6.6h-2.8a.6.6 0 01-.6-.6V18m4 0h-4M7 18h10"
      />
    </Svg>
  );
};

export default memo(Offroad);
