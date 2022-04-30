import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCallbackOne, useMemoOne } from "use-memo-one";

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
import { createUID, showAlert } from "utils/other";
import { formatPickerToS, formatSToMsString } from "utils/time";

import { padding, SCREEN_WIDTH } from "constants/spacing";
import { resetNavigation } from "utils/navigation/navigation";
import { Routes, Stacks } from "constants/navigation/routes";
import { updateWaitingRoomDuration } from "utils/firebase/track";

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
  const [players, setPlayers] = useState<TrackPlayer[]>([] as TrackPlayer[]);
  const [time, setTime] = useState<IValue[]>([
    { id: "hours", value: 1 },
    { id: "minutes", value: 0 },
  ]);
  const timeNumbers: IDigits[] = [
    { id: "hours", min: 0, max: 24 },
    { id: "minutes", min: 0, max: 59 },
  ];

  const onRoomIdInput = useCallbackOne(
    (id: string, text: string) => setRoomData(old => ({ ...old, [id]: text.toUpperCase() })),
    [],
  );

  const bottomSheetOpen = useCallbackOne((): void => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const onRoomDataSingleFetch = useCallbackOne(async (roomID: string) => {
    const player: TrackPlayer = { uid: currUser!.uid, name: currUser?.email!, points: 0, markers: [], currentIndex: 0 };
    // Add new player to room players collection when someone joins
    firestore()
      .collection("rooms")
      .doc(roomID)
      .collection("players")
      .doc(player.uid)
      .set(player)
      .finally(() => {
        // @ts-ignore
        navigation.setOptions({ showAlertOnBack: true, roomID: roomID, userID: currUser?.uid });
        setInitial(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onStartPress = useCallbackOne(() => {
    firestore()
      .collection("rooms")
      .doc(roomData.roomID)
      .update({ isStarted: true, hasEnded: false, endsAt: +new Date() + roomData.duration * 1000 })
      .finally(() => {
        navigation.dispatch(
          resetNavigation([
            { name: Routes.HOME_SCREEN },
            {
              name: Routes.TRACK_SCREEN_INDICATIVE,
              params: { trackInfo: trackData, roomInfo: roomData, players: players },
            },
          ]),
        );
      });
  }, [trackData, roomData, players]);

  useEffect(() => {
    if (isCreator) {
      const roomID = createUID(6).toUpperCase();
      const player: TrackPlayer = {
        uid: currUser!.uid,
        name: currUser?.email!,
        points: 0,
        markers: [],
        currentIndex: 0,
      };
      const data: IndicativeTrackRoom = { ...roomData, roomID, trackID, creatorID: currUser!.uid };
      setRoomData(old => ({ ...old, ...data }));
      // Create room in firestore
      firestore().collection("rooms").doc(roomID).set(data);
      // Add player (creator) in room players collection
      firestore()
        .collection("rooms")
        .doc(roomID)
        .collection("players")
        .doc(player.uid)
        .set(player)
        .finally(() => {
          // @ts-ignore
          navigation.setOptions({ showAlertOnBack: true, roomID: roomID, isCreator: true });
          setInitial(false);
        });
    }
  }, []);

  useEffect(() => {
    const sub = firestore()
      .collection("rooms")
      .doc(roomData.roomID)
      .onSnapshot(
        docSnap => {
          // Check if room still exists
          if (!initial && !isCreator && !docSnap.data() && roomData.roomID) {
            // If not, navigate user to home screen and show alert
            navigation.dispatch(resetNavigation([{ name: Stacks.HOME }]));
            showAlert({
              title: t("errors:roomClosedTitle"),
              message: t("errors:roomClosedDesc"),
              ok: t("errors:close"),
            });
          }
          // If room still exists, update data
          if (!initial) setRoomData(old => ({ ...old, ...docSnap.data() }));
        },
        error => {
          console.log(error);
        },
      );
    return () => sub();
  }, [roomData.roomID, initial]);

  useEffect(() => {
    const sub = firestore()
      .collection("rooms")
      .doc(roomData.roomID)
      .collection("players")
      .onSnapshot(collSnapshot => {
        if (!initial) {
          setPlayers(collSnapshot.docs.map(docSnap => docSnap.data()) as TrackPlayer[]);
        }
      });
    return () => sub();
  }, [roomData.roomID, initial]);

  useEffect(() => {
    if (roomData.isStarted) {
      navigation.dispatch(
        resetNavigation([
          { name: Routes.HOME_SCREEN },
          {
            name: Routes.TRACK_SCREEN_INDICATIVE,
            params: { trackInfo: trackData, roomInfo: roomData, players: players },
          },
        ]),
      );
    }
  }, [roomData, trackData, players]);

  useEffect(() => {
    // Get tracks data from firestore
    if (!!roomData.trackID.length) {
      firestore()
        .collection("tracks")
        .doc(roomData.trackID)
        .get()
        .then(response => {
          setTrackData(response.data() as TrackData);
        })
        .catch(err => console.log(err));
    }
  }, [roomData.trackID]);

  useEffect(() => {
    // Update duration value in firestore
    if (!initial && time && roomData.roomID) {
      setRoomData(old => ({ ...old, duration: formatPickerToS(time) }));
      updateWaitingRoomDuration(roomData.roomID, formatPickerToS(time));
    }
  }, [time, roomData.roomID]);

  if (!isCreator && initial) {
    // @ts-ignore
    navigation.setOptions({ showAlertOnBack: false });
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
        {isCreator && (
          <View style={styles.buttons}>
            <Button title={t("waitingRoom:edit")} onPress={bottomSheetOpen} style={styles.button} />
            <Button title={t("waitingRoom:start")} onPress={onStartPress} style={styles.button} />
          </View>
        )}
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.title}>{t("waitingRoom:joined")}:</Text>
        <FlatList
          data={players}
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
