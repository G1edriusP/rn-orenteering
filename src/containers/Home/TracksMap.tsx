import React, { useEffect, useState } from "react";

// Styles
import styles from "styles/containers/Home/TracksMap";

// Components
import { View } from "react-native";
import { SmallButton } from "components";
import { BackIcon, SearchIcon } from "assets/svg";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

// Constants
import { TracksMapScreenProps } from "constants/navigation/types";
// @ts-ignore
import mapStyle from "constants/mapStyle";
import { TrackData } from "constants/types/types";
import { fetchMyTracks, fetchTracks } from "utils/firebase/track";
import { firebase } from "@react-native-firebase/auth";
import { Routes } from "constants/navigation/routes";

// Utils

const TracksMap = ({ navigation, route: { params } }: TracksMapScreenProps) => {
  const { top } = useSafeAreaInsets();
  const { infoType } = params;

  const [tracks, setTracks] = useState<TrackData[]>([]); // Cognitive or Indicative tracks

  useEffect(() => {
    if (!!!tracks.length) {
      if (infoType === "MY_TRACKS") {
        fetchMyTracks(firebase.auth().currentUser?.uid, setTracks);
      } else {
        fetchTracks(setTracks);
      }
    }
  }, []);

  const onBackPress = () => navigation.goBack();
  const onSearchPress = () => navigation.navigate(Routes.TRACKS_SCREEN, { tracks });

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={[styles.headerWrap, { paddingTop: top }]}>
        <SmallButton Icon={BackIcon} size={28} onPress={onBackPress} />
        <SmallButton Icon={SearchIcon} size={28} onPress={onSearchPress} />
      </View>
      <MapView
        customMapStyle={mapStyle}
        provider={"google"}
        style={styles.map}
        initialRegion={{
          latitude: 54.901102,
          longitude: 23.89155,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {!!tracks.length
          ? tracks[0].markers.map((marker: MarkerType, index: number) => (
              <Marker
                key={index}
                coordinate={marker.location}
                title={marker.title}
                description={marker.description}
              />
            ))
          : null}
      </MapView>
    </SafeAreaView>
  );
};

export default TracksMap;
