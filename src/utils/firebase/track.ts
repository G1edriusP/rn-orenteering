import { TrackData, TrackDataAction } from "constants/types/types";

export const tracksReducer = (state: TrackData, action: TrackDataAction): TrackData => {
  return { ...state, [action.type]: action.value };
};
