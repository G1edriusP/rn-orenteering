import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Styles
import styles from "styles/containers/Home/HomeScreen";

// Components
import { FlatList, ListRenderItemInfo, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeCard, Fab } from "components";
import { GameTrackIcon, ProfileIcon, SettingsIcon, TracksIcon } from "assets/svg";

// Constants
import { Routes } from "constants/navigation/routes";

// Types
import { CardsDataType } from "constants/types/components";
import { HomeScreenProps } from "constants/navigation/types";
import { useTranslation } from "react-i18next";
import { padding } from "constants/spacing";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  const cardsData: CardsDataType[] = [
    {
      title: t("homeTabs:myRoutes"),
      onPress: () =>
        navigation.navigate(Routes.TRACKS_MAP_SCREEN, {
          infoType: "MY_TRACKS",
        }),
      icon: TracksIcon,
    },
    {
      title: t("homeTabs:allRoutes"),
      onPress: () =>
        navigation.navigate(Routes.TRACKS_MAP_SCREEN, {
          infoType: "OTHER_TRACKS",
        }),
      icon: TracksIcon,
    },
    {
      title: t("homeTabs:joinRoute"),
      onPress: () => navigation.navigate(Routes.WAITING_ROOM),
      icon: GameTrackIcon,
    },
    {
      title: t("homeTabs:profile"),
      onPress: () => navigation.navigate(Routes.PROFILE_SCREEN),
      icon: ProfileIcon,
    },
    {
      title: t("homeTabs:settings"),
      onPress: () => navigation.navigate(Routes.SETTINGS_SCREEN),
      icon: SettingsIcon,
    },
    { title: "", onPress: () => {}, icon: undefined },
  ];

  const ListRenderItem = ({ item }: ListRenderItemInfo<CardsDataType>) => (
    <HomeCard testID={item.title} title={item.title} onPress={item.onPress} Icon={item.icon} />
  );

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
      <Fab
        testID={"fab"}
        onPress={onFabPress}
        style={Platform.select({
          ios: { marginBottom: bottom - padding.MEDIUM },
        })}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
