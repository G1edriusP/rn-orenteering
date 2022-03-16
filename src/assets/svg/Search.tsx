import React, { memo } from "react";

// Components
import Svg, { Path, Ellipse, Circle } from "react-native-svg";

// Constants
import colors from "constants/colors";

type Props = {
  size: number;
  color?: string;
};

const Search: React.FC<Props> = ({ size, color = colors.BLACK }) => {
  return (
    <Svg width={size} height={size} strokeWidth='1.5' viewBox='0 0 24 24'>
      <Path
        // fill={color}
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.5 15.5L19 19M5 11a6 6 0 1012 0 6 6 0 00-12 0z'
      />
    </Svg>
  );
};

export default memo(Search);
