import React, { useReducer, useRef, useState } from "react";
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
import { defaultMarkerData, defaultTrackData, defaultTrackTypes, IDS, initialMarkerMapRegion } from "constants/values";
import { MarkerType } from "constants/types/firestore";
import colors from "constants/colors";
// @ts-ignore
import mapStyle from "constants/mapStyle";

// Utils
import { markerReducer, saveTrack, tracksReducer } from "utils/firebase/track";
import { padding } from "constants/spacing";
import { firebase } from "@react-native-firebase/auth";
import { createUID, showAlert } from "utils/other";
import { useTranslation } from "react-i18next";
import { validateField } from "utils/validation/track";
import { Routes } from "constants/navigation/routes";
import { resetNavigation } from "utils/navigation/navigation";

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
        value: { ...markerData.location, longitude: Number(val) } as LatLng,
      });
    else
      dispatchMarkerInfo({
        type: IDS.MARKER_LOCATION,
        value: { ...markerData.location, latitude: Number(val) } as LatLng,
      });
  };

  // Update map position when user manually writes location coordinates
  const onMarkerLocationManualChangeSubmit = (): void =>
    markerMapRef.current?.animateToRegion({
      ...markerData.location,
      longitudeDelta: 0.025,
      latitudeDelta: 0.025,
    });

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
      saveTrack({ ...trackData, uid: firebase.auth().currentUser?.uid, id: createUID() }, onTrackSave);
    } else {
      showAlert({ title: error.title, message: error.description, cancel: t("errors:goBack") });
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.wrap} edges={["bottom", "left", "right"]}>
      <Text style={[styles.title, { marginBottom: padding.MIDI }]}>{t("createTrack:commonInfo")}</Text>
      <TextInput
        id={IDS.TRACK_TITLE}
        editable={!isLoading}
        value={trackData.title}
        placeholder={t("createTrack:name")}
        onChangeText={onTrackInputChange}
        keyboardType='default'
        style={styles.smallBottomSpacer}
      />
      <Dropdown
        items={defaultTrackTypes}
        title={t("createTrack:type")}
        selected={trackData.type}
        onChange={value => onTrackInputChange(IDS.TRACK_TYPE, value)}
        style={styles.dropdown}
      />
      <TextInput
        id={IDS.TRACK_DESCRIPTION}
        editable={!isLoading}
        value={trackData.description}
        placeholder={t("createTrack:description")}
        onChangeText={onTrackInputChange}
        keyboardType='default'
        multiline
        style={[styles.mediumBottomSpacer, styles.multilineInput] as TextStyle}
      />

      <View style={styles.addMarkerWrap}>
        <Text style={styles.title}>{t("createTrack:routePoints")}</Text>
        <TouchableOpacity style={styles.addMarker} onPress={bottomSheetOpen}>
          <PlusIcon size={24} color={colors.WHITE} />
        </TouchableOpacity>
      </View>

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
              style={styles.smallBottomSpacer}
            />
            <TextInput
              id={IDS.MARKER_DESCRIPTION}
              editable={!isLoading}
              value={markerData.description}
              placeholder={t("createTrack:description")}
              onChangeText={onMarkerInputChange}
              keyboardType='default'
              multiline
              style={[styles.mediumBottomSpacer, styles.multilineInput] as TextStyle}
            />

            <Text style={[styles.title, { marginBottom: padding.MIDI }]}>{t("createTrack:routePointLocation")}</Text>

            <BottomSheetView style={styles.locationWrap}>
              <BottomSheetView style={styles.locationInput}>
                <TextInput
                  id={IDS.MARKER_LATITUDE}
                  editable={!isLoading}
                  value={!!markerData.location.latitude ? String(markerData.location.latitude.toFixed(6)) : ""}
                  placeholder={t("createTrack:latitude")}
                  onChangeText={onMarkerLocationManualChange}
                  onSubmitEditing={onMarkerLocationManualChangeSubmit}
                  keyboardType='decimal-pad'
                  style={{ textAlign: "center" }}
                />
              </BottomSheetView>
              <BottomSheetView style={styles.locationInput}>
                <TextInput
                  id={IDS.MARKER_LONGITUDE}
                  editable={!isLoading}
                  value={!!markerData.location.longitude ? String(markerData.location.longitude.toFixed(6)) : ""}
                  placeholder={t("createTrack:longitude")}
                  onChangeText={onMarkerLocationManualChange}
                  onSubmitEditing={onMarkerLocationManualChangeSubmit}
                  keyboardType='decimal-pad'
                  style={{ textAlign: "center" }}
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
