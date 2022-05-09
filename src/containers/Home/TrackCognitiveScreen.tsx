import React, { useEffect, useRef, useState } from 'react';

// Styles
import styles from 'styles/containers/Home/TracksMap';

// Components
import { Platform, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SmallButton, TrackInfoSheet } from 'components';
import { BackIcon, CloseIcon, SearchIcon } from 'assets/svg';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import MapView, {
  Callout,
  CalloutSubview,
  LatLng,
  Marker,
  Polyline,
} from 'react-native-maps';
import { firebase } from '@react-native-firebase/auth';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import MarkerIcon2 from 'assets/images/akytes.svg';

// Constants
import { TrackMapCognitiveScreenProps } from 'constants/navigation/types';
// @ts-ignore
import mapStyle from 'constants/mapStyle';
import { TrackData, TrackInfoHandle } from 'constants/types/types';
import { MarkerType } from 'constants/types/firestore';
import {
  fontSizes,
  padding,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from 'constants/spacing';
import { fetchCoordinatesBetweenPoints } from 'utils/other';
import colors from 'constants/colors';
import { formatSToMsString, formatTimeString } from 'utils/time';
import Carousel from 'react-native-snap-carousel';
import { useCallbackOne } from 'use-memo-one';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fontMedium, fontRegular } from 'constants/fonts';
import { TrackCardIcons } from 'constants/values';
import { hasLocationPermission } from 'utils/location/permissions';

const RenderItem: React.FC<{
  item: MarkerType;
  index: number;
}> = ({ item, index }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.WHITE,
        width: SCREEN_WIDTH - padding.LARGE * 2,
        height: 96,
        borderRadius: padding.SMALL,
        padding: padding.MIDI,
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          fontFamily: fontMedium,
          fontSize: fontSizes.MIDI,
          color: colors.DARK_BLUE,
          marginBottom: padding.SMALL,
        }}
      >
        {item.title}
      </Text>
      <Text
        numberOfLines={2}
        style={{
          fontFamily: fontRegular,
          fontSize: fontSizes.SMALL,
          color: colors.DARK_GREY,
          marginBottom: padding.SMALL,
        }}
      >
        {item.description}
      </Text>
    </TouchableOpacity>
  );
};

const TrackCognitiveScreen = ({
  navigation,
  route: { params },
}: TrackMapCognitiveScreenProps) => {
  const { top } = useSafeAreaInsets();
  const { track } = params;

  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  const [time, setTime] = useState(0); // in mili seconds

  const sheetRef = useRef<TrackInfoHandle>(null);
  const mapRef = useRef<MapView>(null);
  const carouselRef = useRef<Carousel<MarkerType>>(null);

  // For hiding header while marker is pressed
  const headerPos = useSharedValue(0);
  const headerRStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(headerPos.value) }],
  }));

  const onBackPress = () => navigation.goBack();

  const onMarkerPress = (index: number, location: LatLng) => {
    carouselRef.current?.snapToItem(index, true);
    if (Platform.OS === 'ios')
      mapRef.current?.animateCamera({ center: location, pitch: 2 });
  };

  const onCardScroll = useCallbackOne(
    (index: number) => {
      const { location } = track.markers[index];
      mapRef.current?.animateCamera({ center: location, pitch: 2 });
    },
    [track.markers, mapRef]
  );

  useEffect(() => {
    let interval: any = null;
    if (track) {
      // Fetches route coordinates for map polylines
      fetchCoordinatesBetweenPoints(track.markers, setCoordinates);
      // Starts the timer
      interval = setInterval(() => {
        setTime((lastTimerCount) => {
          return lastTimerCount + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.wrap}>
      {track ? (
        <MapView
          ref={mapRef}
          customMapStyle={mapStyle}
          provider={'google'}
          style={styles.map}
          toolbarEnabled={false}
          showsCompass={false}
          showsUserLocation
          followsUserLocation
          initialRegion={{
            latitude: track.markers[0].location.latitude,
            longitude: track.markers[0].location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {track.markers.map((marker: MarkerType, index: number) => (
            <Marker
              onPress={() => onMarkerPress(index, marker.location)}
              key={index}
              coordinate={marker.location}
              title={marker.title}
              description={marker.description}
            >
              <MarkerIcon2 height={72} width={72} />
            </Marker>
          ))}
          <Polyline
            coordinates={coordinates}
            fillColor={colors.DARK_GREEN}
            strokeColor={colors.DARK_GREEN}
            strokeWidth={5}
          />
        </MapView>
      ) : null}

      {track ? (
        <View
          style={{
            position: 'absolute',
            bottom: padding.LARGE + padding.SMALL,
          }}
        >
          <Carousel
            layout={'default'}
            ref={carouselRef}
            data={track.markers}
            renderItem={(props) => <RenderItem {...props} />}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH - padding.LARGE * 2}
            enableSnap
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            activeSlideAlignment="center"
            onBeforeSnapToItem={onCardScroll}
          />
        </View>
      ) : null}

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
    </SafeAreaView>
  );
};

export default TrackCognitiveScreen;
