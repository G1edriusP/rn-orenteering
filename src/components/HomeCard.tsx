import React, { memo } from 'react';

// Styles
import styles from 'styles/components/HomeCard';

// Components
import { Text, ViewStyle, TouchableOpacity, View } from 'react-native';
import { SettingsIcon } from 'assets/svg';
import { padding } from 'constants/spacing';

export type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  Icon?: React.FC<{ size: number }>;
};

const HomeCard: React.FC<Props> = ({ title, onPress, style, Icon }) => {
  return Icon ? (
    <TouchableOpacity onPress={onPress} style={[styles.wrap, style]}>
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
