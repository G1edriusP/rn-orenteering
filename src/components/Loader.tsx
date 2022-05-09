import colors from 'constants/colors';
import React, { memo } from 'react';

// Components
import { ActivityIndicator } from 'react-native';

type Props = {
  color?: string;
  size?: 'large' | 'small';
};

const Loader: React.FC<Props> = ({ color = colors.WHITE, size = 'small' }) => {
  return <ActivityIndicator color={color} size={size} />;
};

export default memo(Loader);
