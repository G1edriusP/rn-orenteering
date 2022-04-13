import React, { useEffect, useRef, useState } from "react";

// Styles
import styles from "styles/containers/Home/TracksMap";

// Components
import { Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Loader, SmallButton, TrackInfoSheet } from "components";
import { BackIcon, SearchIcon } from "assets/svg";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Callout, CalloutSubview, LatLng, Marker, Polyline } from "react-native-maps";
import { firebase } from "@react-native-firebase/auth";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, useDerivedValue } from "react-native-reanimated";

// Constants
import { TracksMapScreenProps } from "constants/navigation/types";
// @ts-ignore
import mapStyle from "constants/mapStyle";
import { TrackData, TrackInfoHandle } from "constants/types/types";
import { Routes } from "constants/navigation/routes";
import { MarkerType } from "constants/types/firestore";
import { padding, SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/spacing";

// Utils
import { fetchMyTracks, fetchTracks, getTracksStartingMarkers } from "utils/firebase/track";
import { timingConfig } from "constants/animations";
import colors from "constants/colors";

const TracksMap = ({ navigation, route: { params } }: TracksMapScreenProps) => {
  const { top } = useSafeAreaInsets();
  const { infoType } = params;

  const sheetRef = useRef<TrackInfoHandle>(null);
  const mapRef = useRef<MapView>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tracks, setTracks] = useState<TrackData[]>([]); // Cognitive or Indicative tracks
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  // For hiding header while marker is pressed
  const headerPos = useSharedValue(0);
  const headerRStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(headerPos.value) }],
  }));

  const onBackPress = () => navigation.goBack();
  const onSearchPress = () => navigation.navigate(Routes.TRACKS_SCREEN, { tracks });

  const onMarkerPress = (track: TrackData, location: LatLng) => {
    if (Platform.OS === "ios") mapRef.current?.animateCamera({ center: location, pitch: 2 });
    sheetRef.current?.open(track);
  };

  const onMapPress = () => {
    sheetRef.current?.close();
  };

  const onFetchEnd = (data: TrackData[]) => {
    setTracks(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!!!tracks.length) {
      if (infoType === "MY_TRACKS") {
        fetchMyTracks(firebase.auth().currentUser?.uid, onFetchEnd);
      } else {
        fetchTracks(onFetchEnd);
      }
    }
  }, []);

  useEffect(() => {
    if (!!tracks.length) {
      setMarkers(getTracksStartingMarkers(tracks));
    }
  }, [tracks]);

  return (
    <SafeAreaView style={styles.wrap}>
      {isLoading && (
        <View style={styles.loadingWrap}>
          <Loader size='large' color={colors.BLACK} />
        </View>
      )}
      <MapView
        ref={mapRef}
        customMapStyle={mapStyle}
        provider={"google"}
        style={styles.map}
        toolbarEnabled={false}
        showsCompass={false}
        onTouchStart={onMapPress}
        onMapReady={() => setIsLoading(false)}
        initialRegion={{
          latitude: 54.901102,
          longitude: 23.89155,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {!!markers.length
          ? markers.map((marker: MarkerType, index: number) => (
              <Marker
                onPress={() => onMarkerPress(tracks[index], marker.location)}
                key={index}
                coordinate={marker.location}
                title={marker.title}
                description={marker.description}></Marker>
            ))
          : null}
      </MapView>
      <Animated.View style={[styles.headerWrap, headerRStyle, { paddingTop: top + padding.MEDIUM }]}>
        <SmallButton Icon={BackIcon} size={28} onPress={onBackPress} />
        <SmallButton Icon={SearchIcon} size={28} onPress={onSearchPress} />
      </Animated.View>
      <TrackInfoSheet ref={sheetRef} topSnap={SCREEN_HEIGHT - top} headerPos={headerPos} />
    </SafeAreaView>
  );
};

export default TracksMap;
