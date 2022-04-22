import React, { memo } from "react";

// Components
import Svg, { Path } from "react-native-svg";

// Constants
import colors from "constants/colors";

type Props = {
  size: number;
  color?: string;
};

const City: React.FC<Props> = ({ size, color = colors.DARK_GREEN }) => {
  return (
    <Svg width={size} height={size} strokeWidth='1.5' viewBox='0 0 24 24'>
      <Path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M7 9.01l.01-.011M11 9.01l.01-.011M7 13.01l.01-.011M11 13.01l.01-.011M7 17.01l.01-.011M11 17.01l.01-.011M15 21H3.6a.6.6 0 01-.6-.6V5.6a.6.6 0 01.6-.6H9V3.6a.6.6 0 01.6-.6h4.8a.6.6 0 01.6.6V9m0 12h5.4a.6.6 0 00.6-.6V9.6a.6.6 0 00-.6-.6H15m0 12v-4m0-8v4m0 0h2m-2 0v4m0 0h2'
      />
    </Svg>
  );
};

export default memo(City);
