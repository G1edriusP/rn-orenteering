import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "styles/containers/Home/WaitingRoom";

// Components
import { View, Text, FlatList } from "react-native";
import { TextInput, Button } from "components";
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";

// Constants
import { WaitingRoomScreenProps } from "constants/navigation/types";

// Utils
import { createUID } from "utils/other";
import { emptyTrackRoom, IndicativeTrackRoom, TrackPlayer } from "constants/types/track";
import colors from "constants/colors";
import { padding } from "constants/spacing";

const WaitingRoomScreen = ({ navigation, route: { params } }: WaitingRoomScreenProps) => {
  const { t } = useTranslation();
  const { trackID } = params || {};
  const isCreator = !!trackID;
  const currUser = firebase.auth().currentUser;

  const [initial, setInitial] = useState<boolean>(true);
  const [roomData, setRoomData] = useState<IndicativeTrackRoom>(emptyTrackRoom);

  const onRoomIdInput = (id: string, text: string) =>
    setRoomData(old => ({ ...old, [id]: text.toUpperCase() }));

  const onRoomDataSingleFetch = async (roomID: string) => {
    const old = await firestore().collection("rooms").doc(roomID).get();
    const player: TrackPlayer = { uid: currUser!.uid, name: currUser?.email!, points: 0 };
    firestore()
      .collection("rooms")
      .doc(roomID)
      .update({ players: [...old.data()?.players, player] })
      .finally(() => setInitial(false));
  };

  useEffect(() => {
    if (isCreator) {
      const roomID = createUID(6).toUpperCase();
      const player: TrackPlayer = { uid: currUser!.uid, name: currUser?.email!, points: 0 };
      const data: IndicativeTrackRoom = { ...roomData, roomID, trackID, players: [player] };
      setRoomData(old => ({ ...old, ...data }));
      firestore()
        .collection("rooms")
        .doc(roomID)
        .set(data)
        .finally(() => setInitial(false));
    }
  }, []);

  useEffect(() => {
    const sub = firestore()
      .collection("rooms")
      .doc(roomData.roomID)
      .onSnapshot(
        docSnap => {
          if (!initial) setRoomData(old => ({ ...old, ...docSnap.data() }));
        },
        error => console.log(error),
      );
    return () => sub();
  }, [roomData.roomID, initial]);

  if (!isCreator && initial) {
    return (
      <View>
        <TextInput
          id={"roomID"}
          value={roomData.roomID}
          onChangeText={onRoomIdInput}
          placeholder={t("waitingRoom:roomCode")}
          autoCapitalize='characters'
        />
        <Button
          title={t("waitingRoom:join")}
          onPress={() => onRoomDataSingleFetch(roomData.roomID)}
        />
        <Text>{roomData.roomID}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text>{roomData.trackID}</Text>
      <Text>{roomData.roomID}</Text>
      <FlatList
        data={roomData.players}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: colors.KHAKI,
              padding: padding.SMALL,
              margin: padding.SMALL,
              borderRadius: padding.SMALL,
              alignItems: "center",
            }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default WaitingRoomScreen;
