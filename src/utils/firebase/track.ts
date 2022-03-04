// Components
import firestore from "@react-native-firebase/firestore";

// Constants
import { MarkerType } from "constants/types/firestore";
import { MarkerDataAction, TrackData, TrackDataAction } from "constants/types/types";
import { defaultMarkerData, defaultTrackData } from "constants/values";

export const tracksReducer = (state: TrackData, action: TrackDataAction): TrackData => {
  if (action.type === "RESET") return defaultTrackData;
  return { ...state, [action.type]: action.value };
};

export const markerReducer = (state: MarkerType, action: MarkerDataAction) => {
  if (action.type === "RESET") return defaultMarkerData;
  return { ...state, [action.type]: action.value };
};

export const saveTrack = (track: TrackData, callback: () => void): void => {
  try {
    firestore().collection("tracks").add(track);
    callback();
  } catch (e) {
    console.log(e);
  }
};

export const fetchTracks = (
  type: string,
  setData: React.Dispatch<React.SetStateAction<TrackData[]>>,
): void => {
  const data: TrackData[] = [];
  firestore()
    .collection("tracks")
    .where("type", "==", type)
    .get()
    .then(docs => {
      docs.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() } as TrackData);
      });
    })
    .catch(e => console.log(e))
    .finally(() => setData(data));
};
