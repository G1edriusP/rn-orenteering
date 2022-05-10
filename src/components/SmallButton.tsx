import React, { memo } from "react";

// Styles
import styles from "styles/components/SmallButton";

// Components
import { Text, TouchableOpacity } from "react-native";

type Props = {
  testID?: string;
  Icon?: React.FC<{ size: number }>;
  size?: number;
  onPress?: () => void;
  isTimer?: boolean;
  time?: string;
};

const SmallButton: React.FC<Props> = ({ testID, Icon, size, onPress, isTimer = false, time }) => {
  return (
    <TouchableOpacity testID={testID} onPress={onPress} style={[styles.wrap, isTimer && { width: 100 }]}>
      {!isTimer ? <Icon size={size} /> : null}
      {isTimer ? <Text style={styles.time}>{time}</Text> : null}
    </TouchableOpacity>
  );
};

export default memo(SmallButton);
