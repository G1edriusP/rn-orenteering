import React, { useEffect } from "react";

// Styles
import styles from "styles/containers/Home/HomeScreen";

// Components
import { FlatList, ListRenderItemInfo } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeCard, Fab, Button } from "components";
import { GameTrackIcon, ProfileIcon, SettingsIcon, TracksIcon } from "assets/svg";

// Utils
import { onSignOutPress } from "utils/firebase/auth";
import { resetNavigation } from "utils/navigation/navigation";

// Constants
import { Routes } from "constants/navigation/routes";
import { removeValue } from "utils/storage";
import { LOCAL_STORAGE_KEYS } from "constants/values";

// Types
import { CardsDataType } from "constants/types/components";
import { HomeScreenProps } from "constants/navigation/types";
import colors from "constants/colors";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const cardsData: CardsDataType[] = [
    {
      title: "Mano maršrutai",
      onPress: () => navigation.navigate(Routes.TRACKS_MAP_SCREEN),
      icon: TracksIcon,
    },
    {
      title: "Kiti maršrutai",
      onPress: () => navigation.navigate(Routes.TRACKS_SCREEN),
      icon: TracksIcon,
    },
    {
      title: "Prisijungti prie maršruto",
      onPress: () => console.log("Join track"),
      icon: GameTrackIcon,
    },
    { title: "Paskyra", onPress: () => console.log("Profile"), icon: ProfileIcon },
    { title: "Nustatymai", onPress: () => console.log("Settings"), icon: SettingsIcon },
    { title: "", onPress: () => {}, icon: undefined },
  ];

  const ListRenderItem = ({ item }: ListRenderItemInfo<CardsDataType>) => (
    <HomeCard title={item.title} onPress={item.onPress} Icon={item.icon} />
  );

  const onSignOutCallback = async () => {
    navigation.dispatch(resetNavigation(Routes.LOGIN_SCREEN));
    await removeValue(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  };

  const onFabPress = () => navigation.navigate(Routes.TRACK_INFO, { type: "CREATE" });

  return (
    <SafeAreaView style={styles.wrap}>
      <Button
        title={"Sign out"}
        onPress={() => onSignOutPress(onSignOutCallback)}
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
