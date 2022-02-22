import { MarkerType } from "constants/types/firestore";
import { MarkerDataAction, TrackData, TrackDataAction } from "constants/types/types";

export const tracksReducer = (state: TrackData, action: TrackDataAction): TrackData => {
  return { ...state, [action.type]: action.value };
};

export const markerReducer = (state: MarkerType, action: MarkerDataAction) => {
  return { ...state, [action.type]: action.value };
};
