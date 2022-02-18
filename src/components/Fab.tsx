import React, { memo } from "react";

// Styles
import styles from "styles/components/Fab";

// Components
import { Text, TouchableOpacity, ViewStyle } from "react-native";

export type Props = {
  onPress: () => void;
  style?: ViewStyle;
};

const Fab: React.FC<Props> = ({ onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrap, style]}>
      <Text>+</Text>
    </TouchableOpacity>
  );
};

export default memo(Fab);
