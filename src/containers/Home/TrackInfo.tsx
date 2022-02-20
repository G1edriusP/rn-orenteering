import React, { useEffect, useState } from "react";

// Styles
import styles from "styles/containers/Home/TrackInfo";

// Components
import { SafeAreaView } from "react-native-safe-area-context";
import firestore from "@react-native-firebase/firestore";
import MapView, { Marker } from "react-native-maps";

// Types
import { TrackInfoScreenProps } from "constants/navigation/types";
import { MarkerType, TrackType } from "constants/types/firestore";
import mapStyle from "constants/mapStyle";

const TrackInfo = ({ route: { params } }: TrackInfoScreenProps) => {
  const { type } = params;
  const [tracks, setTracks] = useState<TrackType[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const data: TrackType[] = [];
      return await firestore()
        .collection("tracks")
        .get()
        .then(docs => {
          docs.forEach(doc => {
            data.push(doc.data() as TrackType);
          });
          setTracks(data);
        })
        .catch(e => console.log(e));
    };
    fetchTracks();
  }, []);

  console.log(!!tracks.length ? tracks[0] : "No tracks");

  return (
    <SafeAreaView style={styles.wrap}>
      <MapView
        customMapStyle={mapStyle}
        provider={"google"}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: !!tracks.length ? tracks[0].markers[0].location.latitude : 0,
          longitude: !!tracks.length ? tracks[0].markers[0].location.longitude : 0,
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

export default TrackInfo;
