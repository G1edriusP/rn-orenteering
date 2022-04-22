// Components
import firestore from "@react-native-firebase/firestore";

// Constants
import { MarkerType } from "constants/types/firestore";
import { FilterDataAction, Filters, MarkerDataAction, TrackData, TrackDataAction } from "constants/types/types";
import { defaultFilterData, defaultMarkerData, defaultTrackData } from "constants/values";

export const tracksReducer = (
  state: TrackData & { days: number; hours: number; minutes: number },
  action: TrackDataAction,
): TrackData & { days: number; hours: number; minutes: number } => {
  if (action.type === "RESET") return defaultTrackData;
  return { ...state, [action.type]: action.value };
};

export const markerReducer = (state: MarkerType, action: MarkerDataAction) => {
  if (action.type === "RESET") return defaultMarkerData;
  return { ...state, [action.type]: action.value };
};

export const filtersReducer = (state: Filters, action: FilterDataAction) => {
  if (action.type === "RESET") return defaultFilterData;
  return { ...state, [action.type]: action.value };
};

export const getTracksStartingMarkers = (tracks: TrackData[]): MarkerType[] => {
  return tracks.map(track => track.markers[0]);
};

export const saveTrack = (track: TrackData, callback: () => void): void => {
  try {
    firestore().collection("tracks").add(track).finally(callback);
  } catch (e) {
    console.log(e);
  }
};

export const fetchTracks = (callback: (data: TrackData[]) => void): void => {
  const data: TrackData[] = [];
  firestore()
    .collection("tracks")
    .where("type", "==", "PUBLIC")
    .get()
    .then(docs => {
      docs.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() } as TrackData);
      });
    })
    .catch(e => console.log(e))
    .finally(() => callback(data));
};

export const fetchMyTracks = (uid: string | undefined, callback: (data: TrackData[]) => void): void => {
  const data: TrackData[] = [];
  firestore()
    .collection("tracks")
    .where("uid", "==", uid)
    .get()
    .then(docs => {
      docs.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() } as TrackData);
      });
    })
    .catch(e => console.log(e))
    .finally(() => callback(data));
};

export const removeWaitingRoom = (roomID: string) => {
  firestore().collection("rooms").doc(roomID).delete();
};

export const removePlayerFromWaitingRoom = (roomID: string, playerID: string) => {
  firestore().collection("rooms").doc(roomID).collection("players").doc(playerID).delete();
};

export const updateWaitingRoomDuration = (roomID: string, duration: number) => {
  firestore()
    .collection("rooms")
    .doc(roomID)
    .update({ duration })
    .catch(err => console.log(err, "Single single"));
};
