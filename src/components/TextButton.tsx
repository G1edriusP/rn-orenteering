import React, { memo } from "react";

// Styles
import styles from "styles/components/TextButton";

// Components
import { TouchableOpacity, Text } from "react-native";

type Props = {
  text: string;
  onPress: () => void;
  color: string;
};

const TextButton: React.FC<Props> = ({ text, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default memo(TextButton);
