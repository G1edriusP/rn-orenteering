import React, { memo } from "react";

// Components
import Svg, { Path } from "react-native-svg";

// Constants
import colors from "constants/colors";

type Props = {
  size: number;
  color?: string;
};

const Star: React.FC<Props> = ({ size, color = colors.DARK_GREEN }) => {
  return (
    <Svg width={size} height={size} strokeWidth='1.5' viewBox='0 0 24 24'>
      <Path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8.587 8.236l2.598-5.232a.911.911 0 011.63 0l2.598 5.232 5.808.844a.902.902 0 01.503 1.542l-4.202 4.07.992 5.75c.127.738-.653 1.3-1.32.952L12 18.678l-5.195 2.716c-.666.349-1.446-.214-1.319-.953l.992-5.75-4.202-4.07a.902.902 0 01.503-1.54l5.808-.845z'
      />
    </Svg>
  );
};

export default memo(Star);
