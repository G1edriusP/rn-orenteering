import React, { useEffect, useState } from "react";

// Components
import { FlatList, ListRenderItemInfo } from "react-native";
import { TrackCard } from "components";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, SceneRendererProps, TabBar, TabView } from "react-native-tab-view";

// Constants
import { Route, TrackData } from "constants/types/types";

// Utils
import { fetchTracks } from "utils/firebase/track";
import colors from "constants/colors";
import { TracksScreenProps } from "constants/navigation/types";
import { SCREEN_WIDTH } from "constants/spacing";

const TracksList = ({
  route,
}: SceneRendererProps & {
  route: Route;
}) => {
  const [tracks, setTracks] = useState<TrackData[]>([]); // Cognitive or Indicative tracks

  useEffect(() => {
    if (!!!tracks.length) {
      console.log(route.key);
      fetchTracks(route.key, setTracks);
    }
  }, []);

  const onPress = () => {
    console.log("Pressed");
  };

  const onFavouritePress = () => {
    console.log("Favourite");
  };

  return (
    <FlatList
      keyExtractor={(item: TrackData) => item.id}
      data={tracks}
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
    indicatorStyle={{ backgroundColor: colors.BLACK }}
    style={{ backgroundColor: colors.WHITE }}
    labelStyle={{ color: colors.BLACK }}
  />
);

const TracksScreen = ({}: TracksScreenProps) => {
  // Tabs info
  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    { key: "COGNITIVE", title: "Pažintiniai" },
    { key: "INDICATIVE", title: "Orientaciniai" },
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        // initialLayout={{ width: SCREEN_WIDTH - 48 }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

export default TracksScreen;
