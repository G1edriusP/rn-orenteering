import React, { memo } from "react";

// Styles
import styles from "styles/components/HomeCard";

// Components
import { Text, ViewStyle, TouchableOpacity } from "react-native";

export type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

const HomeCard: React.FC<Props> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrap, style]}>
      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(HomeCard);
