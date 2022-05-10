import React, { memo } from "react";

// Styles
import styles from "styles/components/HomeCard";

// Components
import { Text, ViewStyle, TouchableOpacity, View } from "react-native";

export type Props = {
  testID?: string;
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  Icon?: React.FC<{ size: number }>;
};

const HomeCard: React.FC<Props> = ({ testID, title, onPress, style, Icon }) => {
  return Icon ? (
    <TouchableOpacity testID={testID} onPress={onPress} style={[styles.wrap, style]}>
      <View style={styles.icon}>
        <Icon size={200} />
      </View>
      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>
    </TouchableOpacity>
  ) : (
    <View style={styles.emptyWrap} />
  );
};

export default memo(HomeCard);
