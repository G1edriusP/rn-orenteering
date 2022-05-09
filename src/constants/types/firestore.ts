import { LatLng } from 'react-native-maps';

export type MarkerType = {
  title: string;
  description?: string;
  location: LatLng;
};

export type TrackType = {
  title: string;
  description: string;
  markers: MarkerType[];
};
