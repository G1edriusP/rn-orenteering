import React, { memo } from "react";

// Styles
// import styles from "styles/components/MarkerCard";

// Components
import { View, Text, TouchableOpacity } from "react-native";
import { TrackCardType } from "constants/types/types";
import { SCREEN_WIDTH } from "constants/spacing";

const TrackCard: React.FC<TrackCardType> = ({ onPress, onFavouritePress, title, description }) => {
  return (
    <TouchableOpacity
      style={{
        width: SCREEN_WIDTH,
        marginBottom: 32,
      }}
      onPress={onPress}>
      <View
        style={{
          backgroundColor: "orange",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          height: SCREEN_WIDTH / 2,
          width: SCREEN_WIDTH - 32,
          marginBottom: 16,
        }}>
        <TouchableOpacity onPress={() => console.log("Add to favourites")}>
          <View style={{ height: 25, width: 25, margin: 16, backgroundColor: "blue" }} />
        </TouchableOpacity>
      </View>
      <Text>{title}</Text>
      <Text numberOfLines={1}>{description}</Text>
    </TouchableOpacity>
  );
};

export default memo(TrackCard);
