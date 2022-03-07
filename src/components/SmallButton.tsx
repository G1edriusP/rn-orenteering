import React, { memo } from "react";

// Styles
import styles from "styles/components/SmallButton";

// Components
import { TouchableOpacity } from "react-native";

type Props = {
  Icon: React.FC<{ size: number }>;
  size: number;
  onPress: () => void;
};

const SmallButton: React.FC<Props> = ({ Icon, size, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrap}>
      <Icon size={size} />
    </TouchableOpacity>
  );
};

export default memo(SmallButton);
