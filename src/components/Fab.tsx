import React, { memo } from "react";

// Styles
import styles, { iconSize } from "styles/components/Fab";

// Components
import { TouchableOpacity, ViewStyle } from "react-native";
import { PlusIcon } from "assets/svg";

export type Props = {
  testID?: string;
  onPress: () => void;
  style?: ViewStyle;
};

const Fab: React.FC<Props> = ({ onPress, style, testID }) => {
  return (
    <TouchableOpacity testID={testID} onPress={onPress} style={[styles.wrap, style]}>
      <PlusIcon size={iconSize} />
    </TouchableOpacity>
  );
};

export default memo(Fab);
