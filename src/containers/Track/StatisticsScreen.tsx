import React, { useEffect, useState } from "react";

// Styles
import styles from "styles/containers/Track/Statistics";

// Components
import { View, Text } from "react-native";

// Constants
import { StatisticsScreenProps } from "constants/navigation/types";
import { TrackData } from "constants/types/types";
import { IndicativeTrackRoom, TrackPlayer } from "constants/types/track";
import firestore from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { fontMedium, fontRegular } from "constants/fonts";
import { fontSizes, padding, SCREEN_WIDTH } from "constants/spacing";
import colors from "constants/colors";

const StatisticsScreen = ({ navigation, route }: StatisticsScreenProps) => {
  // const [track, setTrack] = useState<TrackData>();
  // const [room, setRoom] = useState<IndicativeTrackRoom>();
  // const [players, setPlayers] = useState<TrackPlayer[]>();

  // useEffect(() => {
  //   firestore()
  //     .collection("tracks")
  //     .doc("72mmi8kgw0JG2HqBkVuz")
  //     .get()
  //     .then(item => setTrack(item.data()));
  //   firestore()
  //     .collection("rooms")
  //     .doc("KPIBER")
  //     .get()
  //     .then(item => setRoom(item.data()));
  //   firestore()
  //     .collection("rooms")
  //     .doc("KPIBER")
  //     .collection("players")
  //     .get()
  //     .then(item => setPlayers(item.docs.map(it => it.data())));
  // }, []);

  return (
    <SafeAreaView style={styles.wrap}>
      {/* <Text
        style={{
          fontFamily: fontMedium,
          fontSize: fontSizes.MIDI + fontSizes.SMALL / 2,
          marginBottom: padding.SMALL,
        }}>
        {track?.title}
      </Text>
      <Text
        style={{
          fontFamily: fontRegular,
          fontSize: fontSizes.SMALL,
          marginBottom: padding.LARGE,
        }}>
        Objektų kiekis: {track?.markers.length}
      </Text>
      <View
        style={{
          height: 68,
          width: SCREEN_WIDTH - padding.MEDIUM * 2,
          backgroundColor: colors.SECONDARY_COLOR,
          borderRadius: padding.SMALL,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <View
          style={{
            height: 72,
            justifyContent: "space-between",
            alignItems: "center",
            padding: padding.SMALL,
          }}>
          <Text style={{ fontFamily: fontMedium, fontSize: fontSizes.MIDI }}>{players[0].name}</Text>
          <Text style={{ fontFamily: fontRegular, fontSize: fontSizes.SMALL }}>
            Rasti objektai: {players[0].markers.length} / {track?.markers.length}
          </Text>
        </View>
        <View style={{ padding: padding.SMALL }}>
          <Text style={{ fontFamily: fontMedium, fontSize: fontSizes.MIDI }}>{players[0].points} taškų - #1</Text>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default StatisticsScreen;
