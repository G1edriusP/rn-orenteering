import React, { memo } from "react";

// Components
import Svg, { Path, Ellipse, Circle } from "react-native-svg";

// Constants
import colors from "constants/colors";
import { OffroadIcon } from ".";
import { View } from "react-native";

type Props = {
  size: number;
  color?: string;
  Icon?: React.FC<{ size: number; color: string }>;
};

const Marker: React.FC<Props> = ({ size, color = colors.LIGHT_GREEN, Icon }) => {
  return (
    <Svg height={size} width={size} strokeWidth={1.5} viewBox='0 0 90 139' style={{ aspectRatio: 90 / 139 }}>
      <Path
        fill={color}
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M44.9818 138L6.90406 61.4864L83.1143 61.5136L44.9818 138Z'
      />
      <Ellipse cx={44.5} cy={43} rx={42.5} ry={43} fill={color} />
      <Circle cx={45} cy={43} r={20} fill={colors.WHITE} />
      {Icon ? (
        <View
          style={{
            position: "absolute",
            zIndex: 10,
            right: 0,
            left: 0,
            alignItems: "center",
            paddingTop: 2,
          }}>
          <Icon size={24} color={colors.BLACK} />
        </View>
      ) : null}
    </Svg>
  );
};

export default memo(Marker);
