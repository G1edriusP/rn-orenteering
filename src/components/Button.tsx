import React, { memo } from "react";
import { View, Text } from "react-native";

export type Props = {};

const Button: React.FC<Props> = () => {
  return (
    <View>
      <Text>Home screen</Text>
    </View>
  );
};

export default memo(Button);
