import React, { memo } from "react";

// Components
import Svg, { Path } from "react-native-svg";

// Constants
import colors from "constants/colors";

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
  colorOuter = "#E25822",
  colorInner = "#f5c7b2",
  isSelected = false,
}) => {
  return (
    <Svg width={size} height={size} strokeWidth='1.5' viewBox='0 0 24 24'>
      <Path
        stroke={strokeColor}
        fill={isSelected ? colorInner : "transparent"}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 21c5.05 0 8-2.904 8-7.875C20 8.155 12 3 12 3S4 8.154 4 13.125C4 18.095 6.95 21 12 21z'
      />
      <Path
        stroke={strokeColor}
        fill={isSelected ? colorOuter : "transparent"}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8 18c0 2.415 1.79 3 4 3 3.759 0 5-2.5 2.5-7.5C11 18 10.5 11 11 9c-1.5 3-3 5.818-3 9z'
      />
    </Svg>
  );
};

export default memo(Flame);
