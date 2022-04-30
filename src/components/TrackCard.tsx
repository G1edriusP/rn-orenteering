import React, { memo } from "react";

// Styles
import styles from "styles/components/TrackCard";

// Components
import { View, Text, TouchableOpacity } from "react-native";
import { ClockIcon, FlameIcon, HeartIcon, StarIcon } from "assets/svg";

// Constants
import { TrackCardType } from "constants/types/types";
import { TrackCardIcons } from "constants/values";

// Utils
import { formatSToMsString } from "utils/time";
import colors from "constants/colors";

const TrackCard: React.FC<TrackCardType> = ({
  onPress,
  onFavouritePress,
  title,
  description,
  rating,
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
          <HeartIcon size={28} isSelected={false} color={colors.DARK_BLUE} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle} numberOfLines={2}>
        {description}
      </Text>
      <View style={styles.iconRowWrap}>
        <Icon size={28} color={colors.DARK_BLUE} />
        {!!duration ? (
          <View style={styles.iconWrap}>
            <ClockIcon size={28} color={colors.DARK_BLUE} />
            <Text style={[styles.subtitle, { marginLeft: 4 }]}>{formatSToMsString(duration)}</Text>
          </View>
        ) : null}
        {!!rating ? (
          <View style={styles.iconWrap}>
            <FlameIcon size={24} strokeColor={colors.DARK_BLUE} />
            <Text style={[styles.subtitle, { marginLeft: 4 }]}>{rating}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default memo(TrackCard);
