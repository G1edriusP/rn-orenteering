import React, { memo } from "react";

// Styles
import styles from "styles/components/IconButton";

// Components
import { TouchableOpacity, ViewStyle } from "react-native";

type Props = {
  selected: boolean;
  onPress: () => void;
  Icon: React.FC<{ size: number; selected: boolean }>;
  size: number;
  style?: ViewStyle;
};

const IconButton: React.FC<Props> = ({ selected, onPress, Icon, size, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrap, style]}>
      <Icon size={size} selected={selected} />
    </TouchableOpacity>
  );
};

export default memo(IconButton);
