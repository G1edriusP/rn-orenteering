import React, { memo } from "react";

// Style
import styles from "styles/components/Button";

// Components
import { Text, TouchableOpacity } from "react-native";

export type Props = {
  title: string;
  onPress: () => void;
};

const Button: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(Button);
