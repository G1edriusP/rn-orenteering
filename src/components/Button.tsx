import React, { memo } from 'react';

// Style
import styles from 'styles/components/Button';

// Components
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import Loader from './Loader';

export type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  isLoading?: boolean;
};

const Button: React.FC<Props> = ({
  title,
  onPress,
  style,
  isLoading,
  textStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrap, style]}>
      {!isLoading && <Text style={[styles.title, textStyle]}>{title}</Text>}
      {isLoading && <Loader />}
    </TouchableOpacity>
  );
};

export default memo(Button);
