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
import { TrackData } from "constants/types/types";
import colors from "constants/colors";
import { TracksScreenProps } from "constants/navigation/types";

// Utils
import { fetchTracks, filtersReducer } from "utils/firebase/track";
import { useCallbackOne, useMemoOne } from "use-memo-one";
import { fontSizes, padding } from "constants/spacing";
import { CityIcon, CloseIcon, CountrysideIcon, OffroadIcon } from "assets/svg";
import { defaultFilterData, IDS, TrackCardIcons } from "constants/values";
import { fontMedium } from "constants/fonts";

type FilterButtonProps = {
  id: string;
  value: "CITY" | "COUNTRYSIDE" | "OFF-ROAD";
  Icon?: React.FC<{ size: number; color?: string }>;
  title: string;
  onPress: (id: string, value: string) => void;
  isActive: boolean;
};

const filtersData = {
  relief: [
    { value: "CITY", Icon: CityIcon },
    { value: "COUNTRYSIDE", Icon: CountrysideIcon },
    { value: "OFF-ROAD", Icon: OffroadIcon },
  ],
};

const TracksList = ({ tracks }: { tracks: TrackData[] }) => {
  const onPress = () => {
    console.log("Pressed");
  };

  const onFavouritePress = () => {
    console.log("Favourite");
  };

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

const TracksScreen = ({ route: { params }, navigation }: TracksScreenProps) => {
  const { tracks } = params;
  const { t } = useTranslation();

  const bottomSheetSnapPoints = useMemoOne(() => ["99%"], []);

  const filterRef = useRef<BottomSheet>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [routes, setRoutes] = useState<TrackData[]>(tracks);
  const [selectedFilters, dispatch] = useReducer(filtersReducer, defaultFilterData);

  const onFetchTracksEnd = (data: TrackData[]) => {
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

  const onFilterClosePress = useCallbackOne(
    is => {
      filterRef.current?.close();
      navigation.setOptions({ isFiltersOpened: false });
    },
    [filterRef],
  );

  const onFilterValueChange = useCallbackOne(
    (type: string, value: string) => {
      dispatch({ type, value });
    },
    [dispatch],
  );

  useEffect(() => {
    navigation.setOptions({ onFilterPress, isFiltersOpened: false });
    if (!!!tracks.length) {
      setIsLoading(true);
      fetchTracks(onFetchTracksEnd);
    }
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.WHITE, paddingTop: padding.SMALL }}
      edges={["bottom", "left", "right"]}>
      {isLoading && (
        <View style={styles.loadingWrap}>
          <Loader size='large' color={colors.BLACK} />
        </View>
      )}
      <TracksList tracks={routes} />
      <BottomSheet
        ref={filterRef}
        snapPoints={bottomSheetSnapPoints}
        index={-1}
        handleComponent={null}
        backgroundStyle={styles.sheetBackground}>
        <BottomSheetScrollView style={{ padding: padding.MEDIUM }}>
          <View style={styles.filterHeader}>
            <Text style={styles.title}>Filtruoti</Text>
            <TouchableOpacity onPress={onFilterClosePress}>
              <CloseIcon size={32} />
            </TouchableOpacity>
          </View>
          <Text style={styles.smallTitle}>Reljefas</Text>
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
          <Text style={styles.smallTitle}>Trukmė</Text>
          <View>
            <Slider type={"duration"} values={selectedFilters.duration} onChange={onFilterValueChange} />
          </View>
          <Text style={styles.smallTitle}>Įvertinimas</Text>
          <View></View>
        </BottomSheetScrollView>
        <SafeAreaView edges={["bottom"]} style={styles.wrapShadow}>
          <View style={styles.footerWrap}>
            <Button
              title={"Išvalyti"}
              onPress={() => onFilterValueChange("RESET", "")}
              style={styles.footerFlex}
              textStyle={{ color: colors.BLACK }}
            />
            <Button title={"Rodyti"} onPress={() => {}} style={{ flex: 0.45 }} />
          </View>
        </SafeAreaView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default TracksScreen;
