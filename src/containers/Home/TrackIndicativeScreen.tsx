import React, { useEffect, useRef, useState } from 'react';
import { useCallbackOne, useMemoOne } from 'use-memo-one';

// Styles
import styles from 'styles/containers/Home/TracksMap';

// Components
import { Platform, Text, View } from 'react-native';
import { SmallButton, TrackInfoSheet } from 'components';
import { CloseIcon } from 'assets/svg';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import MapView, { EventUserLocation, LatLng, Marker } from 'react-native-maps';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { GeoError, GeoPosition } from 'react-native-geolocation-service';
import MarkerIcon2 from 'assets/images/akytes.svg';

// Constants
import { TrackMapIndicativeScreenProps } from 'constants/navigation/types';
import { Position, TrackInfoHandle } from 'constants/types/types';
import { MarkerType } from 'constants/types/firestore';
import { padding, SCREEN_HEIGHT } from 'constants/spacing';
import colors from 'constants/colors';
import mapStyle from 'constants/mapStyle.json';

// Utils
import { formatSToMsString } from 'utils/time';
import {
  getLocationUpdates,
  measureDistance,
  measureDistance2,
} from 'utils/location/location';
import { showAlert } from 'utils/other';
import { useTranslation } from 'react-i18next';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { TrackPlayer } from 'constants/types/track';
import { resetNavigation } from 'utils/navigation/navigation';
import { Routes, Stacks } from 'constants/navigation/routes';
import { hasLocationPermission } from 'utils/location/permissions';

const TrackIndicativeScreen = ({
  navigation,
  route: { params },
}: TrackMapIndicativeScreenProps) => {
  const { t } = useTranslation();

  const { top, bottom } = useSafeAreaInsets();
  const { trackInfo, roomInfo, players: oldPlayers } = params;

  const [location, setLocation] = useState<Position>();
  const [time, setTime] = useState(roomInfo.duration);
  const [players, setPlayers] = useState<TrackPlayer[]>(oldPlayers);
  const [currentMarker, setCurrentMarker] = useState<MarkerType>();
  const [distance, setDistance] = useState<number>(0);
  const [isLastMarker, setIsLastMarker] = useState<boolean>(false);

  const userID = auth().currentUser?.uid;

  const sheetRef = useRef<TrackInfoHandle>(null);
  const mapRef = useRef<MapView>(null);

  // For hiding header while marker is pressed
  const headerPos = useSharedValue(0);
  const headerRStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(headerPos.value) }],
  }));

  const initialMapRegion = useMemoOne(
    () => ({
      latitude: location?.latitude || trackInfo.markers[0].location.latitude,
      longitude: location?.longitude || trackInfo.markers[0].location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
    []
  );

  const onBackPress = () => navigation.goBack();

  const onMarkerPress = (marker: MarkerType, location: LatLng) => {
    if (Platform.OS === 'ios')
      mapRef.current?.animateCamera({ center: location, zoom: 15 });
    sheetRef.current?.open(marker);
  };

  const onMapPress = () => {
    sheetRef.current?.close();
  };

  const onMarkerFound = useCallbackOne(
    async (me: TrackPlayer, isLast: boolean) => {
      // Update this user with new data in firestore
      firestore()
        .collection('rooms')
        .doc(roomInfo.roomID)
        .collection('players')
        .doc(userID)
        .update({
          currentIndex: isLast ? me.currentIndex : me.currentIndex + 1,
          points: me.points + 10,
          markers: [...me.markers, currentMarker],
        })
        .finally(
          () =>
            isLast &&
            navigation.dispatch(
              resetNavigation([
                {
                  name: Stacks.TRACK,
                  params: { trackInfo, roomInfo, players },
                },
              ])
            )
        );
    },
    [roomInfo, userID, currentMarker, trackInfo, players]
  );

  const onLocationUpdateSuccess = useCallbackOne(
    (position: Position) => {
      setLocation(position);
      if (currentMarker) {
        const distance = measureDistance(position, currentMarker.location);
        setDistance(Math.round(distance));
        if (Math.round(distance) <= 50) {
          const me = players.find((player) => player.uid === userID);
          if (me) {
            const isLast = me.currentIndex === trackInfo.markers.length - 1;
            setIsLastMarker(isLast);
            showAlert({
              title: `"${currentMarker.title}" ${t('game:found')}`,
              message: isLast ? t('game:gotPointsEnded') : t('game:gotPoints'),
              ok: isLast ? t('game:watchStats') : t('game:continue'),
              onOk: () => onMarkerFound(me, isLast),
            });
          }
        }
      }
    },
    [currentMarker, players, userID, trackInfo.markers]
  );

  const onUserLocationChange = (e: EventUserLocation) => {
    const position = e.nativeEvent.coordinate;
    mapRef.current?.animateCamera({
      center: { longitude: position.longitude, latitude: position.latitude },
    });
    onLocationUpdateSuccess(position);
  };

  // Set new marker locally every time players state gets updated
  useEffect(() => {
    if (players) {
      const me = players.find((player) => player.uid === userID);
      if (me && !isLastMarker) {
        setCurrentMarker(trackInfo.markers[me.currentIndex]);
      }
    }
  }, [players, trackInfo, isLastMarker]);

  // Fetch updated players listener
  useEffect(() => {
    const sub = firestore()
      .collection('rooms')
      .doc(roomInfo.roomID)
      .collection('players')
      .onSnapshot((docSnap) => {
        const newPlayers = docSnap.docs.map((player) =>
          player.data()
        ) as TrackPlayer[];
        setPlayers(newPlayers);
      });
    return () => sub();
  }, []);

  // Starts countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.wrap}>
      {trackInfo && currentMarker ? (
        <MapView
          ref={mapRef}
          customMapStyle={mapStyle}
          loadingEnabled
          provider={'google'}
          loadingBackgroundColor={colors.WHITE}
          style={styles.map}
          toolbarEnabled={false}
          showsCompass={false}
          showsUserLocation
          showsMyLocationButton={false}
          followsUserLocation
          onTouchStart={onMapPress}
          rotateEnabled={false}
          initialRegion={initialMapRegion}
          onUserLocationChange={onUserLocationChange}
        >
          <Marker
            onPress={() => onMarkerPress(currentMarker, currentMarker.location)}
            coordinate={currentMarker.location}
            title={currentMarker.title}
            description={currentMarker.description}
          >
            <MarkerIcon2 height={72} width={72} />
          </Marker>
        </MapView>
      ) : null}

      <View
        style={{
          position: 'absolute',
          bottom: padding.LARGE + bottom,
          right: padding.LARGE,
        }}
      >
        <SmallButton isTimer time={`${distance} m`} />
      </View>

      <Animated.View
        style={[
          styles.headerWrap,
          headerRStyle,
          { paddingTop: top + padding.MEDIUM },
        ]}
      >
        <SmallButton Icon={CloseIcon} size={28} onPress={onBackPress} />
        <SmallButton isTimer time={formatSToMsString(time)} />
      </Animated.View>
      {/* <TrackInfoSheet ref={sheetRef} topSnap={SCREEN_HEIGHT - top} headerPos={headerPos} fromMap={false} /> */}
    </SafeAreaView>
  );
};

export default TrackIndicativeScreen;
