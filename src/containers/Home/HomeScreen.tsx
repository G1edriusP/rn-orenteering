import React from "react";

// Styles
import styles from "styles/containers/Home/HomeScreen";

// Components
import { FlatList, ListRenderItemInfo } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeCard, Fab, Button } from "components";
import { GameTrackIcon, ProfileIcon, SettingsIcon, TracksIcon } from "assets/svg";

// Utils
import { onSignOutPress } from "utils/firebase/auth";

// Constants
import { Routes } from "constants/navigation/routes";

// Types
import { CardsDataType } from "constants/types/components";
import { HomeScreenProps } from "constants/navigation/types";
import colors from "constants/colors";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const cardsData: CardsDataType[] = [
    {
      title: "Mano maršrutai",
      onPress: () => navigation.navigate(Routes.TRACKS_MAP_SCREEN, { infoType: "MY_TRACKS" }),
      icon: TracksIcon,
    },
    {
      title: "Visi maršrutai",
      onPress: () => navigation.navigate(Routes.TRACKS_MAP_SCREEN, { infoType: "OTHER_TRACKS" }),
      icon: TracksIcon,
    },
    {
      title: "Prisijungti prie maršruto",
      onPress: () => navigation.navigate(Routes.WAITING_ROOM),
      icon: GameTrackIcon,
    },
    { title: "Paskyra", onPress: () => console.log("Profile"), icon: ProfileIcon },
    { title: "Nustatymai", onPress: () => console.log("Settings"), icon: SettingsIcon },
    { title: "", onPress: () => {}, icon: undefined },
  ];

  const ListRenderItem = ({ item }: ListRenderItemInfo<CardsDataType>) => (
    <HomeCard title={item.title} onPress={item.onPress} Icon={item.icon} />
  );

  const onFabPress = () => navigation.navigate(Routes.TRACK_INFO, { type: "CREATE" });

  return (
    <SafeAreaView style={styles.wrap}>
      <Button
        title={"Sign out"}
        onPress={onSignOutPress}
        style={{ backgroundColor: colors.KHAKI, marginBottom: 16, marginHorizontal: 12 }}
      />
      <FlatList
        data={cardsData}
        keyExtractor={(item: CardsDataType) => item.title}
        renderItem={ListRenderItem}
        numColumns={2}
        columnWrapperStyle={styles.listColumn}
      />
      <Fab onPress={onFabPress} />
    </SafeAreaView>
  );
};

export default HomeScreen;
