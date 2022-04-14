import React, { useEffect, useRef, useState } from "react";
import { useCallbackOne, useMemoOne } from "use-memo-one";

// Styles
import styles from "styles/containers/Home/TracksMap";

// Components
import { Platform } from "react-native";
import { SmallButton, TrackInfoSheet } from "components";
import { CloseIcon } from "assets/svg";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { EventUserLocation, LatLng, Marker } from "react-native-maps";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { GeoError, GeoPosition } from "react-native-geolocation-service";

// Constants
import { TrackMapIndicativeScreenProps } from "constants/navigation/types";
import { TrackInfoHandle } from "constants/types/types";
import { MarkerType } from "constants/types/firestore";
import { padding, SCREEN_HEIGHT } from "constants/spacing";
import colors from "constants/colors";
import mapStyle from "constants/mapStyle";

// Utils
import { formatSToMsString } from "utils/time";
import { getLocationUpdates, measureDistance } from "utils/location/location";
import { showAlert } from "utils/other";
import { useTranslation } from "react-i18next";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { TrackPlayer } from "constants/types/track";

const TrackIndicativeScreen = ({ navigation, route: { params } }: TrackMapIndicativeScreenProps) => {
  const { t } = useTranslation();

  const { top } = useSafeAreaInsets();
  const { trackInfo, roomInfo, players: oldPlayers } = params;

  const userID = auth().currentUser?.uid;

  const [location, setLocation] = useState<GeoPosition>();
  const [time, setTime] = useState(roomInfo.duration);
  const [players, setPlayers] = useState<TrackPlayer[]>(oldPlayers);
  const [currentMarker, setCurrentMarker] = useState<MarkerType>(trackInfo.markers[0]);

  const watchId = useRef(null);
  const sheetRef = useRef<TrackInfoHandle>(null);
  const mapRef = useRef<MapView>(null);

  // For hiding header while marker is pressed
  const headerPos = useSharedValue(0);
  const headerRStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(headerPos.value) }],
  }));

  const initialMapRegion = useMemoOne(
    () => ({
      latitude: location?.coords.latitude || trackInfo.markers[0].location.latitude,
      longitude: location?.coords.longitude || trackInfo.markers[0].location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
    [],
  );

  const onBackPress = () => navigation.goBack();

  const onMarkerPress = (marker: MarkerType, location: LatLng) => {
    if (Platform.OS === "ios") mapRef.current?.animateCamera({ center: location, zoom: 15 });
    sheetRef.current?.open(marker);
  };

  const onMapPress = () => {
    sheetRef.current?.close();
  };

  const onMarkerFound = async () => {
    // Fetch existing players data
    const res = await firestore().collection("rooms").doc(roomInfo.roomID).collection("players").get();
    const players = res.docs.map(player => player.data()) as TrackPlayer[];
    const me = players.find(player => player.uid === userID);
    if (me) {
      // Update this user with new data in firestore
      // firestore()
      //   .collection("rooms")
      //   .doc(roomInfo.roomID)
      //   .collection("players")
      //   .doc(userID)
      //   .update({
      //     points: me.points + 10,
      //     markers: [...me.markers, currentMarker],
      //   })
      //   .finally(() => {
      //     setCurrentMarker(trackInfo.markers[me.markers.length + 1]);
      //   });
      setCurrentMarker(trackInfo.markers[me.markers.length + 1]);
    } else {
      console.log("Error while trying to find player to add points and update markers");
    }
  };

  const onLocationUpdateSuccess = useCallbackOne(
    (position: GeoPosition) => {
      setLocation(position);
      const distance = measureDistance(position.coords, currentMarker.location);
      if (Math.round(distance) <= 30) {
        console.log(distance);
        showAlert({
          title: `${trackInfo.title}$ ${t("game:found")}`,
          message: t("game:gotPoints"),
          ok: t("game:continue"),
          onOk: onMarkerFound,
        });
      }
    },
    [trackInfo.title, currentMarker],
  );

  const onLocationUpdateError = useCallbackOne(
    (error: GeoError) => {
      console.log(error);
    },
    [currentMarker],
  );

  const onUserLocationChange = (e: EventUserLocation) => {
    mapRef.current?.animateCamera({
      center: { longitude: e.nativeEvent.coordinate.longitude, latitude: e.nativeEvent.coordinate.latitude },
    });
  };

  // Fetch updated players listener
  useEffect(() => {
    const sub = firestore()
      .collection("rooms")
      .doc(roomInfo.roomID)
      .collection("players")
      .onSnapshot(docSnap => {
        const newPlayers = docSnap.docs.map(player => player.data()) as TrackPlayer[];
        setPlayers(newPlayers);
      });
    return () => sub();
  }, []);

  // Starts location tracking
  useEffect(() => {
    getLocationUpdates(watchId, onLocationUpdateSuccess, onLocationUpdateError);
  }, []);

  return (
    <SafeAreaView style={styles.wrap}>
      {trackInfo ? (
        <MapView
          ref={mapRef}
          customMapStyle={mapStyle}
          loadingEnabled
          provider={"google"}
          loadingBackgroundColor={colors.WHITE}
          style={styles.map}
          toolbarEnabled={false}
          showsCompass={false}
          showsUserLocation
          followsUserLocation
          onTouchStart={onMapPress}
          rotateEnabled={false}
          initialRegion={initialMapRegion}
          onUserLocationChange={onUserLocationChange}>
          <Marker
            onPress={() => onMarkerPress(currentMarker, currentMarker.location)}
            coordinate={currentMarker.location}
            title={currentMarker.title}
            description={currentMarker.description}
          />
        </MapView>
      ) : null}
      <Animated.View style={[styles.headerWrap, headerRStyle, { paddingTop: top + padding.MEDIUM }]}>
        <SmallButton Icon={CloseIcon} size={28} onPress={onBackPress} />
        <SmallButton isTimer time={formatSToMsString(time)} />
      </Animated.View>
      <TrackInfoSheet ref={sheetRef} topSnap={SCREEN_HEIGHT - top} headerPos={headerPos} fromMap={false} />
    </SafeAreaView>
  );
};

export default TrackIndicativeScreen;
