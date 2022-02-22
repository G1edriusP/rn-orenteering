import React, { useEffect } from "react";

// Styles
import styles from "styles/containers/Home/HomeScreen";

// Components
import { FlatList, ListRenderItemInfo } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeCard, Fab } from "components";

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

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const cardsData: CardsDataType[] = [
    { title: "Maršrutai", onPress: () => console.log("Tracks") },
    { title: "Prisijungti prie maršruto", onPress: () => console.log("Join track") },
    { title: "Nustatymai", onPress: () => console.log("Settings") },
    { title: "Paskyra", onPress: () => console.log("Profile") },
  ];

  const ListRenderItem = ({ item }: ListRenderItemInfo<CardsDataType>) => (
    <HomeCard title={item.title} onPress={item.onPress} />
  );

  const onSignOutCallback = async () => {
    navigation.dispatch(resetNavigation(Routes.LOGIN_SCREEN));
    await removeValue(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  };

  const onFabPress = () => navigation.navigate(Routes.TRACK_INFO, { type: "CREATE" });

  return (
    <SafeAreaView style={styles.wrap}>
      <FlatList
        data={cardsData}
        keyExtractor={(item: CardsDataType) => item.title}
        renderItem={ListRenderItem}
        numColumns={2}
        columnWrapperStyle={styles.listColumn}
      />
      <Fab onPress={onFabPress} />
      {/* <Button title={"Sign out"} onPress={() => onSignOutPress(onSignOutCallback)} /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;