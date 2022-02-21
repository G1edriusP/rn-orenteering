import React from "react";

// Styles
import styles from "styles/components/MarkerCard";

// Components
import { View, Text, TouchableOpacity } from "react-native";
import { MarkerCardType } from "constants/types/types";

const MarkerCard: React.FC<MarkerCardType> = ({ onPress, title, description, location }) => {
  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress}>
      <View
        style={{
          backgroundColor: "orange",
          justifyContent: "center",
          alignItems: "center",
          height: 80,
          width: 80,
          marginRight: 16,
        }}>
        <Text>Foto</Text>
      </View>
      <View style={styles.trackData}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.location}>{`${location?.latitude}, ${location?.longitude}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MarkerCard;
