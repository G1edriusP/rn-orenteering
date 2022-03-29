import React, { memo } from "react";

// Components
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

// Constants
import colors from "constants/colors";

type Props = {
  size: number;
  selected: boolean;
};

const Lithuania: React.FC<Props> = ({ size, selected }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 512 370'
      style={[
        {
          aspectRatio: 512 / 370,
        },
        selected && { borderWidth: 2, borderColor: colors.BLACK, borderRadius: 4 },
      ]}>
      <Path fill='#006A44' d='M0 128h512v113.778H0V128z'></Path>
      <Path
        fill='#FDB913'
        d='M455.111 0H56.889A56.889 56.889 0 000 56.889V128h512V56.889A56.891 56.891 0 00455.111 0z'></Path>
      <Path
        fill='#C1272D'
        d='M56.889 369.778H455.11A56.89 56.89 0 00512 312.889v-71.111H0v71.111a56.886 56.886 0 0056.889 56.889z'></Path>
    </Svg>
  );
};

export default memo(Lithuania);
