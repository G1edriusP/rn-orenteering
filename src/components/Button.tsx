import React, { memo } from "react";

// Style
import styles from "styles/components/Button";

// Components
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import Loader from "./Loader";

export type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  isLoading?: boolean;
};

const Button: React.FC<Props> = ({ title, onPress, style, isLoading }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrap, style]}>
      {!isLoading && <Text style={styles.title}>{title}</Text>}
      {isLoading && <Loader />}
    </TouchableOpacity>
  );
};

export default memo(Button);
