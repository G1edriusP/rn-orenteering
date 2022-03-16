import React, { useEffect, useState } from "react";

// Styles
import styles from "styles/containers/Home/TracksScreen";

// Components
import { FlatList, ListRenderItemInfo, Text } from "react-native";
import { TrackCard } from "components";
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
      <Text style={[{ color }, styles.tabBarLabel, focused && { fontFamily: fontSemiBold }]}>
        {route.title}
      </Text>
    )}
  />
);

const TracksScreen = ({ route: { params } }: TracksScreenProps) => {
  const { tracks } = params;

  // Tabs info
  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    {
      key: "COGNITIVE",
      title: "Pažintiniai",
      tracks: tracks.filter(track => track.type === "COGNITIVE"),
    },
    {
      key: "INDICATIVE",
      title: "Orientaciniai",
      tracks: tracks.filter(track => track.type === "INDICATIVE"),
    },
  ]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.WHITE }}
      edges={["bottom", "left", "right"]}>
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
