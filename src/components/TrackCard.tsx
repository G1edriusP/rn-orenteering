import React, { memo } from "react";

// Styles
import styles from "styles/components/TrackCard";

// Components
import { View, Text, TouchableOpacity } from "react-native";
import { ClockIcon, HeartIcon, StarIcon } from "assets/svg";

// Constants
import { TrackCardType } from "constants/types/types";
import { TrackCardIcons } from "constants/values";

// Utils
import { formatSToMsString } from "utils/time";

const TrackCard: React.FC<TrackCardType> = ({
  onPress,
  onFavouritePress,
  title,
  description,
  type,
  relief,
  markers,
  duration,
}) => {
  const Icon = TrackCardIcons[relief];

  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity onPress={() => onFavouritePress && onFavouritePress(0)} style={styles.rightSide}>
          <HeartIcon size={28} isSelected={false} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle} numberOfLines={2}>
        {description}
      </Text>
      <View style={styles.iconRowWrap}>
        <Icon size={28} />
        {!!duration ? (
          <View style={styles.iconWrap}>
            <ClockIcon size={28} />
            <Text style={[styles.subtitle, { marginLeft: 4 }]}>{formatSToMsString(duration)}</Text>
          </View>
        ) : null}
        <View style={styles.iconWrap}>
          <StarIcon size={28} />
          <Text style={[styles.subtitle, { marginLeft: 4 }]}>4.7</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(TrackCard);
