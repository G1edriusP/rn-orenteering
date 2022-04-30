import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import { useMemoOne } from "use-memo-one";

// Styles
import styles from "styles/containers/Home/TrackInfo";

// Components
import { View, Text, TextStyle, ListRenderItemInfo, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MarkerCard, TextInput, Button, Dropdown } from "components";
import { PlusIcon, MarkerIcon } from "assets/svg";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import MapView, { LatLng, Region } from "react-native-maps";

// Types and constants
import { TrackInfoScreenProps } from "constants/navigation/types";
import {
  defaultMarkerData,
  defaultTrackData,
  defaultTrackReliefs,
  defaultTrackTypes,
  IDS,
  initialMarkerMapRegion,
} from "constants/values";
import { MarkerType } from "constants/types/firestore";
import colors from "constants/colors";
// @ts-ignore
import mapStyle from "constants/mapStyle";

// Utils
import { markerReducer, saveTrack, tracksReducer } from "utils/firebase/track";
import { fontSizes, padding, SCREEN_WIDTH } from "constants/spacing";
import { firebase } from "@react-native-firebase/auth";
import { createUID, showAlert } from "utils/other";
import { useTranslation } from "react-i18next";
import { validateField } from "utils/validation/track";
import { Routes } from "constants/navigation/routes";
import { resetNavigation } from "utils/navigation/navigation";
import { formatNewTrackTimeToS } from "utils/time";

const TrackInfo = ({ route: { params }, navigation }: TrackInfoScreenProps) => {
  const { type } = params;

  const { t } = useTranslation();

  // Refs
  const bottomSheetRef = useRef<BottomSheet>(null);
  const markerMapRef = useRef<MapView>(null);

  // States and variables
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [trackData, dispatchTrackInfo] = useReducer(tracksReducer, defaultTrackData);
  const [markerData, dispatchMarkerInfo] = useReducer(markerReducer, defaultMarkerData);
  const bottomSheetSnapPoints = useMemoOne(() => ["99%"], []);

  // Update track data state
  const onTrackInputChange = (id: string, val: string | MarkerType[]): void => {
    dispatchTrackInfo({ type: id, value: val });
  };

  // Update marker data state
  const onMarkerInputChange = (id: string, val: string | LatLng): void => {
    dispatchMarkerInfo({ type: id, value: val });
  };

  // Update marker's data location state when user writes it manually
  const onMarkerLocationManualChange = (id: string, val: string): void => {
    if (id === IDS.MARKER_LONGITUDE)
      dispatchMarkerInfo({
        type: IDS.MARKER_LOCATION,
        value: { latitude: markerData.location.latitude, longitude: val } as unknown as LatLng,
      });
    else
      dispatchMarkerInfo({
        type: IDS.MARKER_LOCATION,
        value: { longitude: markerData.location.longitude, latitude: val } as unknown as LatLng,
      });
  };

  // Update map position when user manually writes location coordinates
  const onMarkerLocationManualChangeSubmit = (): void => {
    const location: LatLng = {
      latitude: Number(markerData.location.latitude),
      longitude: Number(markerData.location.longitude),
    };
    dispatchMarkerInfo({ type: IDS.MARKER_LOCATION, value: location as LatLng });
    markerMapRef.current?.animateToRegion({
      ...location,
      longitudeDelta: 0.025,
      latitudeDelta: 0.025,
    });
  };

  // Update marker data location state when map is moved
  const onMarkerMapRegionChange = (region: Region): void => {
    const { latitude, longitude } = region;
    dispatchMarkerInfo({ type: IDS.MARKER_LOCATION, value: { longitude, latitude } as LatLng });
  };

  // Open bottom sheet
  const bottomSheetOpen = (): void => {
    dispatchMarkerInfo({ type: IDS.RESET });
    bottomSheetRef.current?.snapToIndex(0);
  };

  // Close bottom sheet
  const bottomSheetClose = (): void => {
    dispatchMarkerInfo({ type: IDS.RESET });
    bottomSheetRef.current?.close();
  };

  // Save new marker by updating track data state
  const onNewMarkerSavePress = (): void => {
    const { isValid, error } = validateField(markerData, t, true);
    if (isValid) {
      dispatchTrackInfo({ type: IDS.TRACK_MARKERS, value: [...trackData.markers, markerData] });
      bottomSheetClose();
      dispatchMarkerInfo({ type: IDS.RESET });
    } else {
      showAlert({ title: error.title, message: error.description, cancel: t("errors:goBack") });
    }
  };

  // Remove selected marker from track data state
  const onMarkerRemove = (index: number): void => {
    const filteredMarkers: MarkerType[] = trackData.markers.filter((_, i) => index !== i);
    dispatchTrackInfo({ type: IDS.TRACK_MARKERS, value: filteredMarkers });
  };

  // Clear data states after saving new track to firestore database
  const onTrackSave = () => {
    navigation.dispatch(
      resetNavigation(
        [
          { name: Routes.HOME_SCREEN },
          { name: Routes.TRACKS_MAP_SCREEN, params: { infoType: "OTHER_TRACKS" } },
          { name: Routes.TRACKS_SCREEN, params: { tracks: [] } },
        ],
        2,
      ),
    );
    dispatchTrackInfo({ type: IDS.RESET });
    setIsLoading(false);
  };

  // Save track to firestore database
  const onTrackSavePress = () => {
    setIsLoading(true);
    const { isValid, error } = validateField(trackData, t, false);
    if (isValid) {
      const { title, type, relief, description, markers } = trackData;
      saveTrack(
        {
          title,
          type,
          relief,
          description,
          duration: formatNewTrackTimeToS(trackData),
          markers,
          uid: firebase.auth().currentUser?.uid,
          id: createUID(),
        },
        onTrackSave,
      );
    } else {
      showAlert({ title: error.title, message: error.description, cancel: t("errors:goBack") });
      setIsLoading(false);
    }
  };

  console.log(markerData);

  return (
    <SafeAreaView style={styles.wrap} edges={["bottom", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} scrollToOverflowEnabled={false}>
        <Text style={[styles.title, { marginBottom: padding.MIDI }]}>{t("createTrack:commonInfo")}</Text>
        <TextInput
          id={IDS.TRACK_TITLE}
          editable={!isLoading}
          value={trackData.title}
          placeholder={t("createTrack:name")}
          onChangeText={onTrackInputChange}
          keyboardType='default'
          style={{ ...styles.smallBottomSpacer, ...styles.textInput }}
        />
        <Dropdown
          items={defaultTrackTypes}
          title={t("createTrack:type")}
          selected={trackData.type}
          onChange={value => onTrackInputChange(IDS.TRACK_TYPE, value)}
          style={[styles.dropdown]}
        />
        <Dropdown
          items={defaultTrackReliefs}
          title={t("createTrack:relief")}
          selected={trackData.relief}
          onChange={value => onTrackInputChange(IDS.TRACK_RELIEF, value)}
          style={styles.dropdown}
        />
        <TextInput
          id={IDS.TRACK_DESCRIPTION}
          editable={!isLoading}
          value={trackData.description || ""}
          placeholder={t("createTrack:description")}
          onChangeText={onTrackInputChange}
          keyboardType='default'
          multiline
          style={{ ...styles.mediumBottomSpacer, ...styles.multilineInput, ...styles.textInput }}
        />

        <Text style={[styles.title, { marginBottom: padding.MIDI }]}>{t("createTrack:duration")}</Text>
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            id={IDS.TRACK_DURATION_DAYS}
            editable={!isLoading}
            value={!trackData.days ? "" : String(trackData.days)}
            placeholder={t("createTrack:days")}
            onChangeText={onTrackInputChange}
            keyboardType='numeric'
            style={{ ...styles.smallBottomSpacer, ...styles.textInput, width: SCREEN_WIDTH / 3 - padding.MEDIUM }}
          />
          <TextInput
            id={IDS.TRACK_DURATION_HOURS}
            editable={!isLoading}
            value={!trackData.hours ? "" : String(trackData.hours)}
            placeholder={t("createTrack:hours")}
            onChangeText={onTrackInputChange}
            keyboardType='numeric'
            style={{ ...styles.smallBottomSpacer, ...styles.textInput, width: SCREEN_WIDTH / 3 - padding.MEDIUM }}
          />
          <TextInput
            id={IDS.TRACK_DURATION_MINS}
            editable={!isLoading}
            value={!trackData.minutes ? "" : String(trackData.minutes)}
            placeholder={t("createTrack:minutes")}
            onChangeText={onTrackInputChange}
            keyboardType='numeric'
            style={{ ...styles.mediumBottomSpacer, ...styles.textInput, width: SCREEN_WIDTH / 3 - padding.MEDIUM }}
          />
        </View>

        <View style={styles.addMarkerWrap}>
          <Text style={styles.title}>
            {t("createTrack:routePoints")} ({trackData.markers.length || 0})
          </Text>
          <TouchableOpacity style={styles.addMarker} onPress={bottomSheetOpen}>
            <PlusIcon size={24} color={colors.WHITE} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FlatList
        keyExtractor={(item: MarkerType) =>
          String(`${item.title}_${item.location?.latitude}, ${item.location?.longitude}`)
        }
        data={trackData.markers}
        renderItem={({ item, index }: ListRenderItemInfo<MarkerType>) => (
          <MarkerCard
            onPress={bottomSheetOpen}
            onRemove={() => onMarkerRemove(index)}
            title={item.title}
            description={item.description}
            location={item.location}
          />
        )}
      />

      <Button title={t("createTrack:create")} onPress={onTrackSavePress} style={{ marginTop: 12 }} />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={bottomSheetSnapPoints}
        index={-1}
        enablePanDownToClose
        backgroundStyle={styles.sheetBackground}>
        <BottomSheetScrollView
          style={styles.wrap}
          contentContainerStyle={styles.sheetScrollWrap}
          showsVerticalScrollIndicator={false}>
          <BottomSheetView>
            <Text style={[styles.title, { marginBottom: padding.MIDI }]}>{t("createTrack:routePointInfo")}</Text>

            <TextInput
              id={IDS.MARKER_TITLE}
              editable={!isLoading}
              value={markerData.title}
              placeholder={t("createTrack:name")}
              onChangeText={onMarkerInputChange}
              keyboardType='default'
              style={{ ...styles.smallBottomSpacer, ...styles.textInput }}
            />
            <TextInput
              id={IDS.MARKER_DESCRIPTION}
              editable={!isLoading}
              value={markerData.description}
              placeholder={t("createTrack:description")}
              onChangeText={onMarkerInputChange}
              keyboardType='default'
              multiline
              style={{ ...styles.mediumBottomSpacer, ...styles.multilineInput, ...styles.textInput }}
            />

            <Text style={[styles.title, { marginBottom: padding.MIDI }]}>{t("createTrack:routePointLocation")}</Text>

            <BottomSheetView style={styles.locationWrap}>
              <BottomSheetView style={styles.locationInput}>
                <TextInput
                  id={IDS.MARKER_LATITUDE}
                  editable={!isLoading}
                  value={
                    markerData.location && markerData.location.latitude ? String(markerData.location.latitude) : ""
                  }
                  placeholder={t("createTrack:latitude")}
                  onChangeText={onMarkerLocationManualChange}
                  onSubmitEditing={onMarkerLocationManualChangeSubmit}
                  keyboardType='numeric'
                  style={styles.textInput}
                />
              </BottomSheetView>
              <BottomSheetView style={styles.locationInput}>
                <TextInput
                  id={IDS.MARKER_LONGITUDE}
                  editable={!isLoading}
                  value={
                    markerData.location && markerData.location.longitude ? String(markerData.location.longitude) : ""
                  }
                  placeholder={t("createTrack:longitude")}
                  onChangeText={onMarkerLocationManualChange}
                  onSubmitEditing={onMarkerLocationManualChangeSubmit}
                  keyboardType='numeric'
                  style={styles.textInput}
                />
              </BottomSheetView>
            </BottomSheetView>

            <BottomSheetView>
              <MapView
                ref={markerMapRef}
                customMapStyle={mapStyle}
                provider={"google"}
                style={styles.markerMap}
                initialRegion={initialMarkerMapRegion}
                onRegionChangeComplete={onMarkerMapRegionChange}
              />
              <BottomSheetView style={styles.markerFixed} pointerEvents='none'>
                <MarkerIcon size={36} />
              </BottomSheetView>
              <Text style={styles.subtitle}>{t("createTrack:moveCursor")}</Text>
            </BottomSheetView>
          </BottomSheetView>
          <Button
            title={t("createTrack:save")}
            onPress={onNewMarkerSavePress}
            style={{ marginBottom: padding.MEDIUM }}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default TrackInfo;
