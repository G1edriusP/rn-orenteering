import React, { useEffect, useState } from "react";

// Styles
import styles from "styles/containers/Home/TracksScreen";

// Components
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { Loader, TrackCard } from "components";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, SceneRendererProps, TabBar, TabView } from "react-native-tab-view";

// Constants
import { Route, TrackData } from "constants/types/types";

// Utils
import { fetchTracks } from "utils/firebase/track";
import colors from "constants/colors";
import { TracksScreenProps } from "constants/navigation/types";
import { fontLight, fontMedium, fontRegular, fontSemiBold } from "constants/fonts";
import { fontSizes, padding } from "constants/spacing";
import { useTranslation } from "react-i18next";

const TracksList = ({
  route,
}: SceneRendererProps & {
  route: Route;
}) => {
  // const [tracks, setTracks] = useState<TrackData[]>([]); // Cognitive or Indicative tracks

  // useEffect(() => {
  //   if (!!!tracks.length) {
  //     fetchTracks(route.key, setTracks);
  //   }
  // }, []);

  const onPress = () => {
    console.log("Pressed");
  };

  const onFavouritePress = () => {
    console.log("Favourite");
  };

  return (
    <FlatList
      keyExtractor={(item: TrackData) => String(item.id)}
      data={route.tracks}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }: ListRenderItemInfo<TrackData>) => (
        <TrackCard
          onPress={onPress}
          onFavouritePress={onFavouritePress}
          title={item.title}
          description={item.description}
        />
      )}
    />
  );
};

const renderScene = SceneMap({
  COGNITIVE: TracksList,
  INDICATIVE: TracksList,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.ORANGE }}
    style={{ backgroundColor: colors.KHAKI }}
    labelStyle={{ fontFamily: fontMedium, fontSize: fontSizes.SMALL }}
    inactiveColor={colors.BLACK}
    activeColor={colors.ORANGE}
    renderLabel={({ route, focused, color }) => (
      <Text style={[{ color }, styles.tabBarLabel, focused && { fontFamily: fontSemiBold }]}>{route.title}</Text>
    )}
  />
);

const TracksScreen = ({ route: { params } }: TracksScreenProps) => {
  const { tracks } = params;
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Tabs info
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([
    {
      key: "COGNITIVE",
      title: t("tracks:cognitive"),
      tracks: tracks.filter(track => track.type === "COGNITIVE"),
    },
    {
      key: "INDICATIVE",
      title: t("tracks:indicative"),
      tracks: tracks.filter(track => track.type === "INDICATIVE"),
    },
  ]);

  const onFetchTracksEnd = (data: TrackData[]) => {
    setRoutes(old => [
      { ...old[0], tracks: data.filter(track => track.type === "COGNITIVE") },
      { ...old[1], tracks: data.filter(track => track.type === "INDICATIVE") },
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!!!tracks.length) {
      setIsLoading(true);
      fetchTracks(onFetchTracksEnd);
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }} edges={["bottom", "left", "right"]}>
      {isLoading && (
        <View style={styles.loadingWrap}>
          <Loader size='large' color={colors.BLACK} />
        </View>
      )}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

export default TracksScreen;
