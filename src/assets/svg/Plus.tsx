import React, { memo } from "react";

// Components
import Svg, { Path } from "react-native-svg";

// Constants
import colors from "constants/colors";

type Props = {
  size: number;
  color?: string;
};

const Plus: React.FC<Props> = ({ size, color = colors.WHITE }) => {
  return (
    <Svg height={size} width={size} strokeWidth={1.5} viewBox='0 0 24 24'>
      <Path
        fill={color}
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 12H12M18 12H12M12 12V6M12 12V18'
      />
    </Svg>
  );
};

export default memo(Plus);
