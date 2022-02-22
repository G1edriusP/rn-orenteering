import React, { useReducer, useRef, useState } from "react";
import { useMemoOne } from "use-memo-one";

// Styles
import styles from "styles/containers/Home/TrackInfo";

// Components
import { View, Text, TextStyle, ListRenderItemInfo, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MarkerCard, TextInput, Button } from "components";
import { PlusIcon, MarkerIcon } from "assets/svg";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import MapView, { LatLng, Region } from "react-native-maps";

// Types and constants
import { TrackInfoScreenProps } from "constants/navigation/types";
import { defaultMarkerData, defaultTrackData, IDS, initialMarkerMapRegion } from "constants/values";
import { MarkerType } from "constants/types/firestore";
import { MarkerCardType } from "constants/types/types";
import colors from "constants/colors";
import mapStyle from "constants/mapStyle";

// Utils
import { markerReducer, tracksReducer } from "utils/firebase/track";

// Other
const RenderMarkerCard = ({ item }: ListRenderItemInfo<MarkerCardType>) => (
  <MarkerCard
    onPress={item.onPress}
    title={item.title}
    description={item.description}
    location={item.location}
  />
);

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
  const onMarkerLocationManualChangeSubmit = () =>
    markerMapRef.current?.animateToRegion({
      ...markerData.location,
      longitudeDelta: 0.025,
      latitudeDelta: 0.025,
    });

  // Update marker data location state when map is moved
  const onMarkerMapRegionChange = (region: Region) => {
    const { latitude, longitude } = region;
    onMarkerInputChange(IDS.MARKER_LOCATION, { longitude, latitude } as LatLng);
  };

  // Open new marker screen with bottom sheet
  const onAddNewMarkerPress = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  return (
    <SafeAreaView style={styles.wrap} edges={["bottom", "left", "right"]}>
      <Text>Bendra informacija</Text>

      <TextInput
        id={IDS.TRACK_TITLE}
        editable={!isLoading}
        value={trackData.title}
        placeholder={"Pavadinimas"}
        onChangeText={onTrackInputChange}
        keyboardType='default'
        style={styles.smallBottomSpacer}
      />
      <TextInput
        id={IDS.TRACK_DESCRIPTION}
        editable={!isLoading}
        value={trackData.description}
        placeholder={"Aprašymas"}
        onChangeText={onTrackInputChange}
        keyboardType='default'
        multiline
        style={[styles.smallBottomSpacer, styles.multilineInput] as TextStyle}
      />

      <View style={styles.addMarkerWrap}>
        <Text>Maršruto taškai</Text>
        <TouchableOpacity style={styles.addMarker} onPress={onAddNewMarkerPress}>
          <PlusIcon size={24} color={colors.BLACK} />
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={(item: MarkerCardType) =>
          String(`${item.title}_${item.location?.latitude}, ${item.location?.longitude}`)
        }
        data={trackData.markers}
        renderItem={RenderMarkerCard}
      />

      <Button title={"Sukurti"} onPress={() => console.log("save")} style={{ marginTop: 12 }} />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={bottomSheetSnapPoints}
        index={-1}
        enablePanDownToClose
        detached>
        <BottomSheetScrollView style={styles.wrap}>
          <Text>Maršruto taško informacija</Text>

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
            style={[styles.smallBottomSpacer, styles.multilineInput] as TextStyle}
          />

          <Text>Maršruto taško vieta</Text>

          <BottomSheetView style={styles.locationWrap}>
            <TextInput
              id={IDS.MARKER_LATITUDE}
              editable={!isLoading}
              value={!!markerData.location.latitude ? String(markerData.location.latitude) : ""}
              placeholder={"Platuma"}
              onChangeText={onMarkerLocationManualChange}
              onSubmitEditing={onMarkerLocationManualChangeSubmit}
              keyboardType='decimal-pad'
              style={styles.locationInput}
            />
            <TextInput
              id={IDS.MARKER_LONGITUDE}
              editable={!isLoading}
              value={!!markerData.location.longitude ? String(markerData.location.longitude) : ""}
              placeholder={"Ilguma"}
              onChangeText={onMarkerLocationManualChange}
              onSubmitEditing={onMarkerLocationManualChangeSubmit}
              keyboardType='decimal-pad'
              style={styles.locationInput}
            />
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

            <Text>*Nuveskite žymeklį į norimą vietą</Text>
          </BottomSheetView>
          <Button
            title={"Išsaugoti"}
            onPress={() => console.log("save")}
            style={{ marginTop: 12 }}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default TrackInfo;

// useEffect(() => {
//   const fetchTracks = async () => {
//     const data: TrackType[] = [];
//     return await firestore()
//       .collection("tracks")
//       .get()
//       .then(docs => {
//         docs.forEach(doc => {
//           data.push(doc.data() as TrackType);
//         });
//         setTracks(data);
//       })
//       .catch(e => console.log(e));
//   };
//   fetchTracks();
// }, []);

// <MapView
//       customMapStyle={mapStyle}
//       provider={"google"}
//       style={{ flex: 1 }}
//       initialRegion={{
//         latitude: !!tracks.length ? tracks[0].markers[0].location.latitude : 0,
//         longitude: !!tracks.length ? tracks[0].markers[0].location.longitude : 0,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       }}>
//       {!!tracks.length
//         ? tracks[0].markers.map((marker: MarkerType, index: number) => (
//             <Marker
//               key={index}
//               coordinate={marker.location}
//               title={marker.title}
//               description={marker.description}
//             />
//           ))
//         : null}
//     </MapView>
