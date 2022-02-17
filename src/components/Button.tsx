import React, { memo } from "react";

// Style
import styles from "styles/components/Button";

// Components
import { Text, TouchableOpacity, ViewStyle } from "react-native";

export type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

const Button: React.FC<Props> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrap, style]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(Button);
