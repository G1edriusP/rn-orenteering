import React, { useEffect, useRef, useState } from "react";
import { useCallbackOne } from "use-memo-one";

// Styles
import styles from "styles/containers/Home/TracksMap";

// Components
import { Platform, Text, View } from "react-native";
import { Loader, SmallButton, TrackInfoSheet } from "components";
import { BackIcon, ClockIcon, FlameIcon, SearchIcon } from "assets/svg";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { EventUserLocation, LatLng, Marker, Region } from "react-native-maps";
import { firebase } from "@react-native-firebase/auth";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import MarkerIcon2 from "assets/images/akytes.svg";
import Carousel from "react-native-snap-carousel";

// Constants
import { TracksMapScreenProps } from "constants/navigation/types";
import mapStyle from "constants/mapStyle.json";
import { Posiion, TrackData, TrackInfoHandle } from "constants/types/types";
import { Routes } from "constants/navigation/routes";
import { MarkerType } from "constants/types/firestore";
import { fontSizes, padding, SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/spacing";
import colors from "constants/colors";
import { fontLight, fontMedium, fontRegular } from "constants/fonts";
import { TrackCardIcons } from "constants/values";

// Utils
import { fetchMyTracks, fetchTracks, getTracksStartingMarkers } from "utils/firebase/track";
import { formatSToMsString } from "utils/time";

const RenderItem: React.FC<{
  item: TrackData;
  index: number;
  openTrackInfo: (track: TrackData) => void;
}> = ({ item, openTrackInfo }) => {
  const Icon = TrackCardIcons[item.relief];

  return (
    <TouchableOpacity
      onPress={() => openTrackInfo(item)}
      style={{
        backgroundColor: colors.WHITE,
        width: SCREEN_WIDTH - padding.LARGE * 2,
        // height: 124,
        borderRadius: padding.SMALL,
        padding: padding.MIDI,
        justifyContent: "space-between",
      }}>
      <Text
        style={{
          fontFamily: fontMedium,
          fontSize: fontSizes.MIDI,
          color: colors.DARK_BLUE,
          marginBottom: padding.SMALL,
        }}>
        {item.title}
      </Text>
      <Text
        numberOfLines={2}
        style={{
          fontFamily: fontRegular,
          fontSize: fontSizes.SMALL,
          color: colors.DARK_GREY,
          marginBottom: padding.SMALL,
        }}>
        {item.description}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Icon size={22} />
        {item.duration ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: padding.MEDIUM,
            }}>
            <ClockIcon size={22} />
            <Text
              style={[
                {
                  fontFamily: fontRegular,
                  fontSize: fontSizes.SMALL - 2,
                  color: colors.LIGHT_GREEN,
                },
                { marginLeft: 4 },
              ]}>
              {formatSToMsString(item.duration)}
            </Text>
          </View>
        ) : null}
        {item.rating ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: padding.MEDIUM,
            }}>
            <FlameIcon size={22} strokeColor={colors.DARK_GREEN} />
            <Text
              style={[
                {
                  fontFamily: fontLight,
                  fontSize: fontSizes.SMALL - 2,
                  color: colors.LIGHT_GREEN,
                },
                { marginLeft: 4 },
              ]}>
              {item.rating}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const TracksMap = ({ navigation, route: { params } }: TracksMapScreenProps) => {
  const { top } = useSafeAreaInsets();
  const { infoType } = params;

  const sheetRef = useRef<TrackInfoHandle>(null);
  const mapRef = useRef<MapView>(null);
  const carouselRef = useRef<Carousel<TrackData>>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [region, setRegion] = useState<Region>();
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  // const initialMapRegion = useMemoOne(
  //   () => ({
  //     latitude: location?.latitude || (markers && markers[0].location.latitude) || 54,
  //     longitude: location?.longitude || (markers && markers[0].location.longitude) || 24,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   }),
  //   [],
  // );

  // For hiding header while marker is pressed
  const headerPos = useSharedValue(0);
  const headerRStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(headerPos.value) }],
  }));

  const onBackPress = () => navigation.goBack();
  const onSearchPress = () => navigation.navigate(Routes.TRACKS_SCREEN, { tracks });

  const onMarkerPress = useCallbackOne(
    (index: number, location: LatLng) => {
      carouselRef.current?.snapToItem(index, true);
      if (Platform.OS === "ios") mapRef.current?.animateCamera({ center: location, pitch: 2 });
    },
    [tracks, mapRef, carouselRef],
  );

  const onFetchEnd = (data: TrackData[]) => {
    setTracks(data);
    setIsLoading(false);
  };

  const onTrackNav = (route: string, props: { track?: TrackData; trackID?: string }) => {
    navigation.navigate(route as never, props as never);
  };

  const openTrackInfo = (track: TrackData) => {
    sheetRef.current?.open(track);
  };

  const onMapPress = () => {
    sheetRef.current?.close();
  };

  const onCardScroll = useCallbackOne(
    (index: number) => {
      const { location } = markers[index];
      mapRef.current?.animateCamera({ center: location, pitch: 2 });
    },
    [markers, mapRef],
  );

  const onUserLocationChange = (e: EventUserLocation) => {
    const position = e.nativeEvent.coordinate;
    if (!region) {
      mapRef.current?.animateCamera({
        center: { longitude: position.longitude, latitude: position.latitude },
      });
      setRegion({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (!tracks.length) {
      if (infoType === "MY_TRACKS") {
        fetchMyTracks(firebase.auth().currentUser?.uid, onFetchEnd);
      } else {
        fetchTracks(onFetchEnd);
      }
    }
  }, []);

  useEffect(() => {
    if (tracks.length) {
      setMarkers(getTracksStartingMarkers(tracks));
    }
  }, [tracks]);

  return (
    <SafeAreaView style={styles.wrap}>
      {isLoading || !markers ? (
        <View style={styles.loadingWrap}>
          <Loader size='large' color={colors.BLACK} />
        </View>
      ) : null}
      {markers && !!markers.length ? (
        <MapView
          ref={mapRef}
          customMapStyle={mapStyle}
          provider={"google"}
          style={styles.map}
          toolbarEnabled={false}
          showsCompass={false}
          showsUserLocation
          showsMyLocationButton={false}
          followsUserLocation
          initialRegion={region}
          onTouchStart={onMapPress}
          onUserLocationChange={onUserLocationChange}>
          {markers.map((marker: MarkerType, index: number) => (
            <Marker
              tracksViewChanges={false}
              onPress={() => onMarkerPress(index, marker.location)}
              key={index}
              coordinate={marker.location}
              title={marker.title}
              description={marker.description}>
              <MarkerIcon2 height={72} width={72} />
              {/* <MarkerIcon size={48} Icon={TrackCardIcons[tracks[index].relief]} /> */}
            </Marker>
          ))}
        </MapView>
      ) : null}

      {tracks ? (
        <View
          style={{
            position: "absolute",
            bottom: padding.LARGE + padding.SMALL,
          }}>
          <Carousel
            layout={"default"}
            ref={carouselRef}
            data={tracks}
            renderItem={props => <RenderItem {...props} openTrackInfo={openTrackInfo} />}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH - padding.LARGE * 2}
            enableSnap
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            activeSlideAlignment='center'
            onBeforeSnapToItem={onCardScroll}
          />
        </View>
      ) : null}

      <TrackInfoSheet ref={sheetRef} topSnap={SCREEN_HEIGHT - top} headerPos={headerPos} />

      <Animated.View
        style={[
          styles.headerWrap,
          headerRStyle,
          {
            paddingTop: Platform.select({
              android: top + padding.LARGE,
              ios: top + padding.SMALL,
            }),
          },
        ]}>
        <SmallButton testID={"back"} Icon={BackIcon} size={28} onPress={onBackPress} />
        <SmallButton testID={"search"} Icon={SearchIcon} size={28} onPress={onSearchPress} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default TracksMap;
