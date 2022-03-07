import React, { useReducer, useRef, useState } from "react";
import { useMemoOne } from "use-memo-one";

// Styles
import styles from "styles/containers/Home/TrackInfo";

// Components
import { View, Text, TextStyle, ListRenderItemInfo, FlatList } from "react-native";
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
import { padding } from "constants/spacing";
import { firebase } from "@react-native-firebase/auth";

const TrackInfo = ({ route: { params } }: TrackInfoScreenProps) => {
  const { type } = params;

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
    bottomSheetRef.current?.snapToIndex(0);
  };

  // Close bottom sheet
  const bottomSheetClose = (): void => {
    bottomSheetRef.current?.close();
  };

  // Save new marker by updating track data state
  const onNewMarkerSavePress = (): void => {
    dispatchTrackInfo({ type: IDS.TRACK_MARKERS, value: [...trackData.markers, markerData] });
    bottomSheetClose();
    dispatchMarkerInfo({ type: IDS.RESET });
  };

  // Remove selected marker from track data state
  const onMarkerRemove = (index: number): void => {
    const filteredMarkers: MarkerType[] = trackData.markers.filter((_, i) => index !== i);
    dispatchTrackInfo({ type: IDS.TRACK_MARKERS, value: filteredMarkers });
  };

  // Clear data states after saving new track to firestore database
  const onTrackSave = () => {
    dispatchTrackInfo({ type: IDS.RESET });
  };

  return (
    <SafeAreaView style={styles.wrap} edges={["bottom", "left", "right"]}>
      <Text style={[styles.title, { marginBottom: padding.MIDI }]}>Bendra informacija</Text>
      <TextInput
        id={IDS.TRACK_TITLE}
        editable={!isLoading}
        value={trackData.title}
        placeholder={"Pavadinimas"}
        onChangeText={onTrackInputChange}
        keyboardType='default'
        style={styles.smallBottomSpacer}
      />
      <Dropdown
        items={defaultTrackTypes}
        title={"Tipas"}
        selected={trackData.type}
        onChange={value => onTrackInputChange(IDS.TRACK_TYPE, value)}
        style={styles.dropdown}
      />
      <TextInput
        id={IDS.TRACK_DESCRIPTION}
        editable={!isLoading}
        value={trackData.description}
        placeholder={"Aprašymas"}
        onChangeText={onTrackInputChange}
        keyboardType='default'
        multiline
        style={[styles.mediumBottomSpacer, styles.multilineInput] as TextStyle}
      />

      <View style={styles.addMarkerWrap}>
        <Text style={styles.title}>Maršruto taškai</Text>
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

      <Button
        title={"Sukurti"}
        onPress={() =>
          saveTrack({ ...trackData, uid: firebase.auth().currentUser?.uid }, onTrackSave)
        }
        style={{ marginTop: 12 }}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={bottomSheetSnapPoints}
        index={-1}
        enablePanDownToClose
        detached
        backgroundStyle={styles.sheetBackground}>
        <BottomSheetScrollView style={styles.wrap} contentContainerStyle={styles.sheetScrollWrap}>
          <BottomSheetView>
            <Text style={[styles.title, { marginBottom: padding.MIDI }]}>
              Maršruto taško informacija
            </Text>

            <TextInput
              id={IDS.MARKER_TITLE}
              editable={!isLoading}
              value={markerData.title}
              placeholder={"Pavadinimas"}
              onChangeText={onMarkerInputChange}
              keyboardType='default'
              style={styles.smallBottomSpacer}
            />
            <TextInput
              id={IDS.MARKER_DESCRIPTION}
              editable={!isLoading}
              value={markerData.description}
              placeholder={"Aprašymas"}
              onChangeText={onMarkerInputChange}
              keyboardType='default'
              multiline
              style={[styles.mediumBottomSpacer, styles.multilineInput] as TextStyle}
            />

            <Text style={[styles.title, { marginBottom: padding.MIDI }]}>Maršruto taško vieta</Text>

            <BottomSheetView style={styles.locationWrap}>
              <View style={styles.locationInput}>
                <TextInput
                  id={IDS.MARKER_LATITUDE}
                  editable={!isLoading}
                  value={!!markerData.location.latitude ? String(markerData.location.latitude) : ""}
                  placeholder={"Platuma"}
                  onChangeText={onMarkerLocationManualChange}
                  onSubmitEditing={onMarkerLocationManualChangeSubmit}
                  keyboardType='decimal-pad'
                />
              </View>
              <View style={styles.locationInput}>
                <TextInput
                  id={IDS.MARKER_LONGITUDE}
                  editable={!isLoading}
                  value={
                    !!markerData.location.longitude ? String(markerData.location.longitude) : ""
                  }
                  placeholder={"Ilguma"}
                  onChangeText={onMarkerLocationManualChange}
                  onSubmitEditing={onMarkerLocationManualChangeSubmit}
                  keyboardType='decimal-pad'
                />
              </View>
            </BottomSheetView>

            <BottomSheetView>
              <MapView
                ref={markerMapRef}
                customMapStyle={mapStyle}
                provider={"google"}
                style={styles.markerMap}
                initialRegion={initialMarkerMapRegion}
                onRegionChange={onMarkerMapRegionChange}
              />
              <View style={styles.markerFixed} pointerEvents='none'>
                <MarkerIcon size={36} />
              </View>
              <Text style={styles.subtitle}>* Nuveskite žymeklį į norimą vietą</Text>
            </BottomSheetView>
          </BottomSheetView>
          <Button title={"Išsaugoti"} onPress={onNewMarkerSavePress} style={{ marginTop: 12 }} />
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default TrackInfo;
