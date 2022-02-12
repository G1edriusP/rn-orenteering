import { HomeScreenProps } from "constants/navigation/types";
import React, { useEffect } from "react";

// Components
import { View, Text } from "react-native";

const HomeScreen = ({ route: { params } }: HomeScreenProps) => {
  const { user } = params;

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <View>
      <Text>Home screen</Text>
    </View>
  );
};

export default HomeScreen;
