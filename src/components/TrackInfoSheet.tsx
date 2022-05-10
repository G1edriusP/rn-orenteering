import React, { forwardRef, memo, useImperativeHandle, useRef, useState } from "react";
import { useMemoOne } from "use-memo-one";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Styles
import styles from "styles/components/TrackInfoSheet";

// Components
import BottomSheet from "@gorhom/bottom-sheet";
import { ListRenderItemInfo, Text, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Button from "./Button";
import { ClockIcon, FlameIcon } from "assets/svg";

// Constants
import { TrackData, TrackInfoHandle } from "constants/types/types";
import { padding, SCREEN_WIDTH } from "constants/spacing";
import { Routes } from "constants/navigation/routes";
import { MarkerType } from "constants/types/firestore";
import colors from "constants/colors";
import { TrackCardIcons } from "constants/values";

// Utils
import { showAlert } from "utils/other";
import { formatSToMsString } from "utils/time";
import { updateTrackRating } from "utils/firebase/track";

type Props = {
  topSnap: number;
  headerPos: SharedValue<number>;
  fromMap?: boolean;
  fullScreen?: boolean;
};

type RatingButtonProps = {
  isSelected: boolean;
  onPress: (type: string, value: []) => void;
  index: number;
};

type RatingProps = {
  rating: number;
  selectedRating: number;
  peopleRated: number;
};

const RatingButton: React.FC<RatingButtonProps> = ({ isSelected, onPress, index }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress("rating", [...Array(index + 1).keys()] as [])}
      style={{ marginRight: padding.SMALL }}>
      <FlameIcon size={48} isSelected={isSelected} />
    </TouchableOpacity>
  );
};

const TrackInfoSheet = forwardRef<TrackInfoHandle, Props>(
  ({ topSnap, headerPos, fromMap = true, fullScreen = false }, ref) => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    const sheetRef = useRef<BottomSheet>(null);
    const [info, setInfo] = useState<TrackData | MarkerType>({} as TrackData | MarkerType);
    const [rating, setRating] = useState<RatingProps>({} as RatingProps);
    const [Icon, setIcon] = useState<React.FC<{ size: number; color?: string }>>();

    const sheetSnapPoints = useMemoOne(() => (fullScreen ? ["99%"] : ["35%", topSnap]), []);

    const onSheetClose = () => {
      navigation.setOptions({ sheetOpen: false });
      setInfo({} as TrackData);
      sheetRef.current?.close();
      headerPos.value = 0;
    };

    const onSheetOpen = (data: TrackData | MarkerType, fromMap?: boolean) => {
      navigation.setOptions({ sheetOpen: true });
      setInfo(data);
      setRating({
        rating: data.rating,
        selectedRating: 0,
        peopleRated: data.peopleRated,
      } as RatingProps);
      setIcon(TrackCardIcons[data.relief]);
      sheetRef.current?.snapToIndex(0);
      headerPos.value = -SCREEN_WIDTH;
    };

    const onTrackNav = (route: string, props: {}) => {
      navigation.navigate(route as never, props as never);
      onSheetClose();
    };

    const onTrackStartPress = () => {
      const { id } = info as TrackData;
      showAlert({
        title: t("track:selectType"),
        ok: t("tracks:COGNITIVE"),
        cancel: t("tracks:INDICATIVE"),
        onOk: () => onTrackNav(Routes.TRACK_SCREEN_COGNITIVE, { track: info }),
        onCancel: () => onTrackNav(Routes.WAITING_ROOM, { trackID: id }),
        cancelStyle: { backgroundColor: colors.SECONDARY_COLOR },
      });
    };

    const onRatingSetFinish = () => {};

    const onRatingSet = (index: number) => {
      const newPeopleCount = rating.peopleRated + 1;
      const newRating = +((rating.rating * rating.peopleRated + index + 1) / newPeopleCount).toFixed(1);
      setRating(old => ({
        ...old,
        selectedRating: index + 1,
        peopleRated: newPeopleCount,
        rating: newRating,
      }));
      updateTrackRating(info.id, newRating, rating.peopleRated + 1, onRatingSetFinish);
    };

    useImperativeHandle(ref, () => ({ open: onSheetOpen, close: onSheetClose }), [sheetRef]);

    return (
      <BottomSheet
        ref={sheetRef}
        snapPoints={sheetSnapPoints}
        index={-1}
        style={styles.wrap}
        enablePanDownToClose
        onClose={onSheetClose}>
        {info.markers ? (
          <FlatList
            keyExtractor={(_, index) => String(index)}
            contentContainerStyle={{ marginBottom: padding.MEDIUM }}
            data={info.markers}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                {info.title ? <Text style={styles.title}>{info.title}</Text> : null}
                {info.description ? <Text style={styles.description}>{info.description}</Text> : null}

                <View style={styles.valuesWrap}>
                  {Icon ? <Icon size={24} /> : null}
                  {info.duration ? (
                    <View style={styles.valueItemWrap}>
                      <ClockIcon size={24} />
                      <Text style={styles.valueText}>{formatSToMsString(info.duration)}</Text>
                    </View>
                  ) : null}
                  {info.rating ? (
                    <View style={styles.valueItemWrap}>
                      <FlameIcon size={24} strokeColor={colors.DARK_GREEN} />
                      <Text style={styles.valueText}>{info.rating}</Text>
                    </View>
                  ) : null}
                </View>

                {info.markers ? (
                  <Text style={styles.markersTitle}>
                    {t("track:markers")} ({info.markers.length}):
                  </Text>
                ) : null}
              </>
            }
            renderItem={({ item, index }: ListRenderItemInfo<MarkerType>) => (
              <View style={styles.markerWrap}>
                <Text style={styles.markerTitle}>
                  #{index + 1} {item.title}
                </Text>
                <Text style={styles.markerDesc}>{item.description || t("track:emptyDesc")}</Text>
              </View>
            )}
            ListFooterComponent={
              <>
                <Text style={styles.markersTitle}>{t("track:rate")}:</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: padding.MEDIUM + padding.MIDI,
                  }}>
                  {[...Array(5).keys()].map((index: number) => (
                    <RatingButton
                      key={index}
                      index={index}
                      onPress={() => onRatingSet(index)}
                      isSelected={index + 1 <= rating.selectedRating}
                    />
                  ))}
                </View>
              </>
            }
          />
        ) : null}

        {fromMap && (
          <Button
            title={t("track:start")}
            onPress={onTrackStartPress}
            style={{ marginBottom: padding.LARGE, marginTop: padding.MEDIUM }}
          />
        )}
      </BottomSheet>
    );
  },
);
export default memo(TrackInfoSheet);
