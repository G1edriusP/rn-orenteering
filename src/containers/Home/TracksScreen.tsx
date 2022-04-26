import React, { useEffect, useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "styles/containers/Home/TracksScreen";

// Components
import { FlatList, ListRenderItemInfo, Platform, Text, View } from "react-native";
import { Button, Loader, Slider, TrackCard } from "components";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetScrollView, TouchableOpacity } from "@gorhom/bottom-sheet";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

// Constants
import { Filters, TrackData } from "constants/types/types";
import colors from "constants/colors";
import { TracksScreenProps } from "constants/navigation/types";

// Utils
import { fetchTracks, filtersReducer } from "utils/firebase/track";
import { useCallbackOne, useMemoOne } from "use-memo-one";
import { fontSizes, padding, SCREEN_WIDTH } from "constants/spacing";
import { BinIcon, CityIcon, CloseIcon, CountrysideIcon, FlameIcon, OffroadIcon } from "assets/svg";
import { defaultFilterData, IDS, TrackCardIcons } from "constants/values";
import { fontMedium, fontRegular } from "constants/fonts";
import { findTracksMinMaxDuration } from "utils/other";

type FilterButtonProps = {
  id: string;
  value: "CITY" | "COUNTRYSIDE" | "OFF-ROAD";
  Icon?: React.FC<{ size: number; color?: string }>;
  title: string;
  onPress: (id: string, value: string) => void;
  isActive: boolean;
};

type RatingButtonProps = {
  isSelected: boolean;
  onPress: (type: string, value: []) => void;
  index: number;
};

const filtersData = {
  relief: [
    { value: "CITY", Icon: CityIcon },
    { value: "COUNTRYSIDE", Icon: CountrysideIcon },
    { value: "OFF-ROAD", Icon: OffroadIcon },
  ],
};

const TracksList = ({ tracks, title }: { tracks: TrackData[]; title: string }) => {
  const onPress = () => {
    console.log("Pressed");
  };

  const onFavouritePress = () => {
    console.log("Favourite");
  };

  if (!!!tracks.length) {
    return (
      <View style={styles.emptyWrap}>
        <BinIcon size={96} />
        <Text style={styles.emptyTitle}>{title}</Text>
      </View>
    );
  }

  return (
    <FlatList
      keyExtractor={(item: TrackData) => String(item.id)}
      data={tracks}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }: ListRenderItemInfo<TrackData>) => (
        <TrackCard onPress={onPress} onFavouritePress={onFavouritePress} {...item} />
      )}
    />
  );
};

const FilterButton: React.FC<FilterButtonProps> = ({ id, value, Icon, title, onPress, isActive = false }) => {
  return (
    <TouchableOpacity
      style={[
        isActive ? styles.activeWrap : styles.disabledWrap,
        { height: Icon && 96, flexDirection: Icon ? "column" : "row" },
        {},
      ]}
      onPress={() => onPress && onPress(id, value)}>
      {Icon ? <Icon size={32} color={colors.BLACK} /> : null}
      <Text style={[isActive ? styles.activeTitle : styles.disabledTitle, { marginTop: Icon && 12 }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const RatingButton: React.FC<RatingButtonProps> = ({ isSelected, onPress, index }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress("rating", [...Array(index + 1).keys()] as [])}
      style={{ marginRight: padding.SMALL }}>
      <FlameIcon size={54} isSelected={isSelected} />
    </TouchableOpacity>
  );
};

const TracksScreen = ({ route: { params }, navigation }: TracksScreenProps) => {
  const { tracks } = params;
  const { t } = useTranslation();

  const bottomSheetSnapPoints = useMemoOne(() => ["99%"], []);

  const filterRef = useRef<BottomSheet>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [routes, setRoutes] = useState<TrackData[]>(tracks);
  const [selectedFilters, dispatch] = useReducer(filtersReducer, defaultFilterData);

  const onFetchTracksEnd = (data: TrackData[]) => {
    dispatch({ type: "duration", value: findTracksMinMaxDuration(data) });
    setRoutes(old => [...old, ...data]);
    setIsLoading(false);
  };

  const onFilterPress = useCallbackOne(
    isOpen => {
      if (isOpen) filterRef.current?.close();
      else filterRef.current?.snapToIndex(0);
      navigation.setOptions({ isFiltersOpened: !isOpen });
    },
    [filterRef],
  );

  const onFilterClosePress = useCallbackOne(() => {
    filterRef.current?.close();
    navigation.setOptions({ isFiltersOpened: false });
  }, [filterRef]);

  const onFilterValueChange = useCallbackOne(
    (type: string, value: string | []) => {
      if (selectedFilters.isDefault) dispatch({ type: "isDefault", value: false });
      // If to clear rating field without clearing any other
      if (type === "rating" && selectedFilters.rating.length === 1 && value.length === 1) {
        dispatch({ type, value: [] });
      } else {
        dispatch({ type, value });
      }
    },
    [dispatch, selectedFilters, routes],
  );

  useEffect(() => {
    navigation.setOptions({ onFilterPress, isFiltersOpened: false });
    if (!!!tracks.length) {
      setIsLoading(true);
      fetchTracks(onFetchTracksEnd);
    }
  }, []);

  useEffect(() => {
    if (tracks) {
      dispatch({ type: "duration", value: findTracksMinMaxDuration(tracks) });
    }
  }, []);

  useEffect(() => {
    if (tracks) {
      if (selectedFilters.isDefault) {
        setRoutes(tracks);
      } else {
        const filters: Partial<Filters> = Object.fromEntries(
          Object.entries(selectedFilters).filter(([key, val]) => !!val.length),
        );
        const filteredTracks = tracks.filter(track => {
          console.log(filters.duration);
          return (
            (filters.relief ? track.relief === filters.relief : true) &&
            (filters.duration
              ? track.duration / 3600 >= filters.duration[0] && track.duration / 3600 <= filters.duration[1]
              : true) &&
            (filters.rating ? track.rating >= filters.rating[selectedFilters.rating.length - 1] + 1 : true)
          );
        });
        setRoutes(filteredTracks);
      }
    }
  }, [selectedFilters]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.WHITE, paddingTop: padding.SMALL }}
      edges={["bottom", "left", "right"]}>
      {isLoading && (
        <View style={styles.loadingWrap}>
          <Loader size='large' color={colors.BLACK} />
        </View>
      )}

      <TracksList tracks={routes} title={t("tracks:emptyTracks")} />

      <BottomSheet
        ref={filterRef}
        snapPoints={bottomSheetSnapPoints}
        index={-1}
        handleComponent={null}
        backgroundStyle={styles.sheetBackground}>
        <BottomSheetScrollView style={{ padding: padding.MEDIUM }}>
          <View style={styles.filterHeader}>
            <Text style={styles.title}>{t("tracks:filter")}</Text>
            <TouchableOpacity onPress={onFilterClosePress}>
              <CloseIcon size={32} />
            </TouchableOpacity>
          </View>

          <Text style={styles.smallTitle}>{t("createTrack:relief")}</Text>
          <View style={styles.btnWrap}>
            {filtersData.relief.map((f, index) => (
              <FilterButton
                key={String(index)}
                id={IDS.RELIEF}
                value={f.value}
                title={t(`tracks:${f.value}`)}
                onPress={onFilterValueChange}
                Icon={f.Icon}
                isActive={selectedFilters.relief === f.value}
              />
            ))}
          </View>

          <Text style={styles.smallTitle}>{t("createTrack:duration")}</Text>
          <View style={{ marginBottom: padding.LARGE }}>
            <Slider
              type={"duration"}
              values={selectedFilters.duration}
              onChange={onFilterValueChange}
              subtitle={t("tracks:hour")}
            />
          </View>

          <Text style={styles.smallTitle}>{t("createTrack:rating")}</Text>
          <View style={{ flexDirection: "row" }}>
            {[...Array(5).keys()].map((index: number) => (
              <RatingButton
                key={index}
                index={index}
                onPress={onFilterValueChange}
                isSelected={selectedFilters.rating.includes(index)}
              />
            ))}
          </View>
        </BottomSheetScrollView>

        <SafeAreaView edges={["bottom"]} style={styles.wrapShadow}>
          <View style={styles.footerWrap}>
            <Button
              title={t("tracks:clear")}
              onPress={() => onFilterValueChange("RESET", findTracksMinMaxDuration(tracks))}
              style={styles.footerFlex}
              textStyle={{ color: colors.BLACK }}
            />
            <Text style={{ fontFamily: fontRegular, fontSize: fontSizes.SMALL }}>
              {t("tracks:found")} - {`${routes.length}`}
            </Text>
          </View>
        </SafeAreaView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default TracksScreen;
