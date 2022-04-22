import React, { useEffect, useState } from "react";

// Styles
import styles from "styles/containers/Home/TracksScreen";

// Components
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { Loader, TrackCard } from "components";
import { SafeAreaView } from "react-native-safe-area-context";

// Constants
import { TrackData } from "constants/types/types";

// Utils
import { fetchTracks } from "utils/firebase/track";
import colors from "constants/colors";
import { TracksScreenProps } from "constants/navigation/types";
import { useTranslation } from "react-i18next";

const TracksList = ({ tracks }: { tracks: TrackData[] }) => {
  const onPress = () => {
    console.log("Pressed");
  };

  const onFavouritePress = () => {
    console.log("Favourite");
  };

  return (
    <FlatList
      keyExtractor={(item: TrackData) => String(item.id)}
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

const TracksScreen = ({ route: { params } }: TracksScreenProps) => {
  const { tracks } = params;
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [routes, setRoutes] = useState<TrackData[]>(tracks);

  const onFetchTracksEnd = (data: TrackData[]) => {
    setRoutes(old => [...old, ...data]);
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
      <TracksList tracks={routes} />
    </SafeAreaView>
  );
};

export default TracksScreen;
