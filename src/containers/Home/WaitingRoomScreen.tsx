import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "styles/containers/Home/WaitingRoom";

// Components
import { View, Text, FlatList } from "react-native";
import { TextInput, Button } from "components";
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import NumbersPlease from "react-native-number-please";
import BottomSheet from "@gorhom/bottom-sheet";

// Constants
import { WaitingRoomScreenProps } from "constants/navigation/types";
import { TrackData } from "constants/types/types";
import { emptyTrackRoom, IndicativeTrackRoom, TrackPlayer } from "constants/types/track";
import { IDigits, IValue } from "react-native-number-please/dist/src/NumberPlease.interface";

// Utils
import { createUID } from "utils/other";
import { formatPickerToS, formatSToMsString } from "utils/time";
import { useMemoOne } from "use-memo-one";
import { padding, SCREEN_WIDTH } from "constants/spacing";

const WaitingRoomScreen = ({ navigation, route: { params } }: WaitingRoomScreenProps) => {
  const { t } = useTranslation();
  const { trackID } = params || {};
  const isCreator = !!trackID;
  const currUser = firebase.auth().currentUser;

  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetSnapPoints = useMemoOne(() => ["40%"], []);

  const [initial, setInitial] = useState<boolean>(true);
  const [roomData, setRoomData] = useState<IndicativeTrackRoom>(emptyTrackRoom);
  const [trackData, setTrackData] = useState<TrackData>({} as TrackData);
  const [time, setTime] = useState<IValue[]>([
    { id: "hours", value: 1 },
    { id: "minutes", value: 0 },
  ]);
  const timeNumbers: IDigits[] = [
    { id: "hours", min: 0, max: 24 },
    { id: "minutes", min: 0, max: 59 },
  ];

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

  const bottomSheetOpen = (): void => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const bottomSheetClose = (): void => {
    bottomSheetRef.current?.close();
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

  useEffect(() => {
    if (!!roomData.trackID.length) {
      firestore()
        .collection("tracks")
        .where("id", "==", roomData.trackID)
        .get()
        .then(response => {
          setTrackData(response.docs[0].data() as TrackData);
        });
    }
  }, [roomData.trackID]);

  useEffect(() => {
    setRoomData(old => ({ ...old, duration: formatPickerToS(time) }));
  }, [time]);

  if (!isCreator && initial) {
    return (
      <View style={styles.guestWrap}>
        <TextInput
          id={"roomID"}
          value={roomData.roomID}
          onChangeText={onRoomIdInput}
          placeholder={t("waitingRoom:roomCode")}
          autoCapitalize='characters'
          style={styles.guestInput}
          maxLength={6}
        />
        <Button
          title={t("waitingRoom:join")}
          onPress={() => onRoomDataSingleFetch(roomData.roomID)}
          style={styles.button}
        />
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.topView}>
        <Text style={styles.title} numberOfLines={2}>
          {trackData.title}
        </Text>
        <Text style={styles.subtitle}>
          {t("waitingRoom:roomID")}: {roomData.roomID}
        </Text>
        <Text style={styles.subtitle}>
          {t("waitingRoom:duration")}: {formatSToMsString(roomData.duration)}
        </Text>
        <View style={styles.buttons}>
          <Button title={t("waitingRoom:edit")} onPress={bottomSheetOpen} style={styles.button} />
          <Button title={t("waitingRoom:start")} onPress={() => {}} style={styles.button} />
        </View>
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.title}>{t("waitingRoom:joined")}:</Text>
        <FlatList
          data={roomData.players}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrap}
          style={styles.joinedList}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
          )}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={bottomSheetSnapPoints}
        index={-1}
        enablePanDownToClose
        style={styles.sheetWrap}
        backgroundStyle={styles.sheetBackground}>
        <Text style={styles.title}>{t("waitingRoom:duration")}:</Text>
        <NumbersPlease
          digits={timeNumbers}
          values={time}
          onChange={values => setTime(values)}
          itemStyle={{}}
          pickerStyle={{
            width: SCREEN_WIDTH / 4,
          }}
        />
      </BottomSheet>
    </View>
  );
};

export default WaitingRoomScreen;
