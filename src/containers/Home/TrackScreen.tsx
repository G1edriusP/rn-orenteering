import React, { useEffect, useRef, useState } from "react";

// Styles
import styles from "styles/containers/Home/TracksMap";

// Components
import { Platform, TouchableWithoutFeedback, View } from "react-native";
import { SmallButton, TrackInfoSheet } from "components";
import { BackIcon, CloseIcon, SearchIcon } from "assets/svg";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Callout, CalloutSubview, LatLng, Marker, Polyline } from "react-native-maps";
import { firebase } from "@react-native-firebase/auth";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

// Constants
import { TrackMapScreenProps } from "constants/navigation/types";
// @ts-ignore
import mapStyle from "constants/mapStyle";
import { TrackData, TrackInfoHandle } from "constants/types/types";
import { MarkerType } from "constants/types/firestore";
import { padding, SCREEN_HEIGHT } from "constants/spacing";
import { fetchCoordinatesBetweenPoints } from "utils/other";
import colors from "constants/colors";

// Utils

const TrackScreen = ({ navigation, route: { params } }: TrackMapScreenProps) => {
  const { top } = useSafeAreaInsets();
  const { track } = params;

  const [coordinates, setCoordinates] = useState<LatLng[]>([]);

  const sheetRef = useRef<TrackInfoHandle>(null);
  const mapRef = useRef<MapView>(null);

  // For hiding header while marker is pressed
  const headerPos = useSharedValue(0);
  const headerRStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(headerPos.value) }],
  }));

  const onBackPress = () => navigation.goBack();

  const onMarkerPress = (marker: MarkerType, location: LatLng) => {
    if (Platform.OS === "ios") mapRef.current?.animateCamera({ center: location, pitch: 2 });
    sheetRef.current?.open(marker);
  };

  const onMapPress = () => {
    sheetRef.current?.close();
  };

  useEffect(() => {
    if (track) {
      fetchCoordinatesBetweenPoints(track.markers, setCoordinates);
    }
  }, []);

  return (
    <SafeAreaView style={styles.wrap}>
      {track ? (
        <MapView
          ref={mapRef}
          customMapStyle={mapStyle}
          provider={"google"}
          style={styles.map}
          toolbarEnabled={false}
          showsCompass={false}
          onTouchStart={onMapPress}
          initialRegion={{
            latitude: track.markers[0].location.latitude,
            longitude: track.markers[0].location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {track.markers.map((marker: MarkerType, index: number) => (
            <Marker
              onPress={() => onMarkerPress(track.markers[index], marker.location)}
              key={index}
              coordinate={marker.location}
              title={marker.title}
              description={marker.description}></Marker>
          ))}
          <Polyline
            coordinates={coordinates}
            fillColor={"black"}
            strokeColor={colors.ORANGE}
            strokeWidth={2}
          />
        </MapView>
      ) : null}
      <Animated.View
        style={[styles.headerWrap, headerRStyle, { paddingTop: top + padding.MEDIUM }]}>
        <SmallButton Icon={CloseIcon} size={28} onPress={onBackPress} />
      </Animated.View>
      <TrackInfoSheet ref={sheetRef} topSnap={SCREEN_HEIGHT - top} headerPos={headerPos} />
    </SafeAreaView>
  );
};

export default TrackScreen;
