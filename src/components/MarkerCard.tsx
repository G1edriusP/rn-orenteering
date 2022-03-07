import React, { memo } from "react";

// Styles
import styles from "styles/components/MarkerCard";

// Components
import { View, Text, TouchableOpacity } from "react-native";
import { MarkerCardType } from "constants/types/types";
import { CloseIcon } from "assets/svg";

const MarkerCard: React.FC<MarkerCardType> = ({
  onPress,
  onRemove,
  type,
  title,
  description,
  location,
}) => {
  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress}>
      <View style={styles.image}>
        <Text>Foto</Text>
      </View>
      <View style={styles.trackData}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.location}>{type}</Text>
        <Text
          style={styles.location}
          numberOfLines={1}>{`${location?.latitude}, ${location?.longitude}`}</Text>
      </View>
      {/* @ts-ignore */}
      <TouchableOpacity onPress={onRemove} style={styles.remove}>
        <CloseIcon size={24} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default memo(MarkerCard);
