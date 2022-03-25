import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useMemoOne } from "use-memo-one";

// Styles
import styles from "styles/components/TrackInfoSheet";

// Components
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// Constants
import { TrackData, TrackInfoHandle } from "constants/types/types";
import { Text, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { SCREEN_WIDTH } from "constants/spacing";
import Button from "./Button";

type Props = {
  topSnap: number;
  headerPos: SharedValue<number>;
};

const TrackInfoSheet = forwardRef<TrackInfoHandle, Props>(({ topSnap, headerPos }, ref) => {
  const sheetRef = useRef<BottomSheet>(null);
  const [info, setInfo] = useState<TrackData>({} as TrackData);

  const sheetSnapPoints = useMemoOne(() => ["35%", topSnap], []);

  const onSheetClose = () => {
    setInfo({} as TrackData);
    sheetRef.current?.close();
    headerPos.value = 0;
  };

  const onSheetOpen = (track: TrackData) => {
    setInfo(track);
    sheetRef.current?.snapToIndex(0);
    headerPos.value = -SCREEN_WIDTH;
  };

  useImperativeHandle(ref, () => ({ open: onSheetOpen, close: onSheetClose }), [sheetRef]);

  return (
    <BottomSheet ref={sheetRef} snapPoints={sheetSnapPoints} index={-1} style={styles.wrap}>
      <BottomSheetScrollView>
        <View style={styles.image}></View>
        {info.title ? <Text style={styles.title}>{info.title}</Text> : null}
        {info.description ? <Text style={styles.description}>{info.description}</Text> : null}
        <Button title={"Pradėti"} onPress={() => console.log("Start")} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
});
export default TrackInfoSheet;
