import React, { memo } from "react";

// Styles
import styles from "styles/components/IconButton";

// Components
import { TouchableOpacity, ViewStyle } from "react-native";
import colors from "constants/colors";

type Props = {
  selected: boolean;
  onPress: () => void;
  Icon: React.FC<{ size: number; selected: boolean }>;
  size: number;
};

const IconButton: React.FC<Props> = ({ selected, onPress, Icon, size }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrap}>
      <Icon size={size} selected={selected} />
    </TouchableOpacity>
  );
};

export default memo(IconButton);
