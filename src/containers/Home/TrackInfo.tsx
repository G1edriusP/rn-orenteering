import React from "react";

// Styles
import styles from "styles/containers/Home/TrackInfo";

// Components
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Types
import { TrackInfoScreenProps } from "constants/navigation/types";

const TrackInfo = ({ route: { params } }: TrackInfoScreenProps) => {
  const { type } = params;

  return (
    <SafeAreaView style={styles.wrap}>
      <Text>{`Track info screen - ${type}`}</Text>
    </SafeAreaView>
  );
};

export default TrackInfo;
