import React, { memo } from 'react';

// Styles
import styles, { iconSize } from 'styles/components/Fab';

// Components
import { TouchableOpacity, ViewStyle } from 'react-native';
import { PlusIcon } from 'assets/svg';

export type Props = {
  onPress: () => void;
  style?: ViewStyle;
};

const Fab: React.FC<Props> = ({ onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrap, style]}>
      <PlusIcon size={iconSize} />
    </TouchableOpacity>
  );
};

export default memo(Fab);
