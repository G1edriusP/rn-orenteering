import React from "react";

// Styles
import styles from "styles/containers/Track/Statistics";

// Components
import { View, Text } from "react-native";

// Constants
import { StatisticsScreenProps } from "constants/navigation/types";

const StatisticsScreen = ({ navigation, route }: StatisticsScreenProps) => {
  return (
    <View style={styles.wrap}>
      <Text>Stats</Text>
    </View>
  );
};

export default StatisticsScreen;
