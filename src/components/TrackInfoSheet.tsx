import React, { forwardRef, memo, useImperativeHandle, useRef, useState } from "react";
import { useMemoOne } from "use-memo-one";
import { useNavigation } from "@react-navigation/native";

// Styles
import styles from "styles/components/TrackInfoSheet";

// Components
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// Constants
import { TrackData, TrackInfoHandle } from "constants/types/types";
import { Alert, Text, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { SCREEN_WIDTH } from "constants/spacing";
import Button from "./Button";
import { Routes } from "constants/navigation/routes";
import { MarkerType } from "constants/types/firestore";

type Props = {
  topSnap: number;
  headerPos: SharedValue<number>;
  fromMap?: boolean;
};

const TrackInfoSheet = forwardRef<TrackInfoHandle, Props>(({ topSnap, headerPos, fromMap = true }, ref) => {
  const navigation = useNavigation();

  const sheetRef = useRef<BottomSheet>(null);
  const [info, setInfo] = useState<TrackData | MarkerType>({} as TrackData | MarkerType);

  const sheetSnapPoints = useMemoOne(() => ["35%", topSnap], []);

  const onSheetClose = () => {
    setInfo({} as TrackData);
    sheetRef.current?.close();
    headerPos.value = 0;
  };

  const onSheetOpen = (data: TrackData | MarkerType, fromMap?: boolean) => {
    setInfo(data);
    sheetRef.current?.snapToIndex(0);
    headerPos.value = -SCREEN_WIDTH;
  };

  const onTrackNav = (route: string, props: {}) => {
    navigation.navigate(route as never, props as never);
    onSheetClose();
  };

  const onTrackStartPress = () => {
    Alert.alert("Pasirinkite maršruto tipą:", undefined, [
      {
        text: "Pažintinis",
        onPress: () => onTrackNav(Routes.TRACK_SCREEN_COGNITIVE, { track: info }),
      },
      {
        text: "Orientacinis",
        // @ts-ignore
        onPress: () => onTrackNav(Routes.WAITING_ROOM, { trackID: info.id }),
      },
    ]);
  };

  useImperativeHandle(ref, () => ({ open: onSheetOpen, close: onSheetClose }), [sheetRef]);

  return (
    <BottomSheet ref={sheetRef} snapPoints={sheetSnapPoints} index={-1} style={styles.wrap}>
      <BottomSheetScrollView>
        {info.title ? <Text style={styles.title}>{info.title}</Text> : null}
        {info.description ? <Text style={styles.description}>{info.description}</Text> : null}
        {fromMap && <Button title={"Pradėti"} onPress={onTrackStartPress} />}
      </BottomSheetScrollView>
    </BottomSheet>
  );
});
export default memo(TrackInfoSheet);
