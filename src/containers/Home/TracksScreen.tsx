import colors from "constants/colors";
import { TracksScreenProps } from "constants/navigation/types";
import { SCREEN_WIDTH } from "constants/spacing";
import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";

// Components
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabBarItemProps, TabBarProps, TabView } from "react-native-tab-view";

const CognitiveTracks = () => (
  <View>
    <Text>Cognitive</Text>
  </View>
);

const IndicativeTracks = () => (
  <View>
    <Text>Indicative</Text>
  </View>
);

const renderScene = SceneMap({
  "0": CognitiveTracks,
  "1": IndicativeTracks,
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
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "0", title: "Pažintiniai" },
    { key: "1", title: "Orientaciniai" },
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: SCREEN_WIDTH }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

export default TracksScreen;
