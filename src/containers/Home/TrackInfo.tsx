import React, { useReducer, useState } from "react";

// Styles
import styles from "styles/containers/Home/TrackInfo";

// Components
import {
  View,
  Text,
  TextStyle,
  ListRenderItemInfo,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Button, MarkerCard, TextInput } from "components";
import { Plus } from "assets/svg";
import { SafeAreaView } from "react-native-safe-area-context";
import firestore from "@react-native-firebase/firestore";
// import MapView, { Marker } from "react-native-maps";

// Types and constants
import { TrackInfoScreenProps } from "constants/navigation/types";
import { defaultTrackData, IDS } from "constants/values";
import { MarkerType } from "constants/types/firestore";
import { MarkerCardType } from "constants/types/types";
import colors from "constants/colors";

// Utils
import { tracksReducer } from "utils/firebase/track";

// import { MarkerType, TrackType } from "constants/types/firestore";
// import mapStyle from "constants/mapStyle";

// Other
const RenderMarkerCard = ({ item }: ListRenderItemInfo<MarkerCardType>) => (
  <MarkerCard
    onPress={item.onPress}
    title={item.title}
    description={item.description}
    location={item.location}
  />
);

const TrackInfo = ({ route: { params } }: TrackInfoScreenProps) => {
  const { type } = params;

  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [data, dispatch] = useReducer(tracksReducer, defaultTrackData);

  const onInputChange = (id: string, text: string | MarkerType[]): void => {
    dispatch({ type: id, value: text });
  };

  const onMarkerPress = () => {};

  return (
    <SafeAreaView style={styles.wrap} edges={["bottom", "left", "right"]}>
      <Text>Bendra informacija</Text>

      <TextInput
        id={IDS.TRACK_TITLE}
        editable={!isLoading}
        value={data.title}
        placeholder={"Pavadinimas"}
        onChangeText={onInputChange}
        keyboardType='default'
        style={styles.smallBottomSpacer}
      />
      <TextInput
        id={IDS.TRACK_DESCRIPTION}
        editable={!isLoading}
        value={data.description}
        placeholder={"Aprašymas"}
        onChangeText={onInputChange}
        keyboardType='default'
        multiline
        style={[styles.smallBottomSpacer, styles.multilineInput] as TextStyle}
      />

      <View style={styles.addMarkerWrap}>
        <Text>Maršruto taškai</Text>
        <TouchableOpacity style={styles.addMarker}>
          <Plus size={24} color={colors.BLACK} />
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={(item: MarkerCardType) =>
          String(`${item.title}_${item.location?.latitude}, ${item.location?.longitude}`)
        }
        data={data.markers}
        renderItem={RenderMarkerCard}
      />
      <Button title={"Sukurti"} onPress={() => console.log("save")} />
    </SafeAreaView>
  );
};

export default TrackInfo;
