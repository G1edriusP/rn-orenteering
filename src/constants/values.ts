import { CityIcon, CountrysideIcon, OffroadIcon } from 'assets/svg';
import { MarkerType } from './types/firestore';
import { CardIcons, EmailAuthData, Filters, ItemProps, LocalStorageKeys, TrackData } from './types/types';

export const defaultEmailLoginData: EmailAuthData = {
  email: '',
  password: '',
};

export const defaultEmailRegisterData: EmailAuthData = {
  email: '',
  username: '',
  password: '',
  repeatedPassword: '',
};

export const defaultTrackTypes: Array<ItemProps> = [{ value: 'PUBLIC' }, { value: 'PRIVATE' }];
export const defaultTrackReliefs: Array<ItemProps> = [
  { value: 'CITY' },
  { value: 'COUNTRYSIDE' },
  { value: 'OFF-ROAD' },
];

export const defaultTrackData: TrackData & {
  days: number;
  hours: number;
  minutes: number;
} = {
  type: 'PUBLIC',
  title: '',
  duration: 3600,
  relief: 'CITY',
  description: '',
  markers: [],
  uid: '',
};

export const defaultMarkerData: MarkerType = {
  title: '',
  description: '',
  location: { latitude: 0, longitude: 0 },
};

export const defaultFilterData: Filters = {
  relief: '',
  duration: [0, 1],
  rating: [],
  isDefault: true,
};

export const IDS = {
  RESET: 'RESET',
  EMAIL: 'email',
  USERNAME: 'username',
  PASSWORD: 'password',
  REPEATED_PASSWORD: 'repeatedPassword',
  TRACK_TITLE: 'title',
  TRACK_TYPE: 'type',
  TRACK_RELIEF: 'relief',
  TRACK_DURATION: 'duration',
  TRACK_DURATION_DAYS: 'days',
  TRACK_DURATION_HOURS: 'hours',
  TRACK_DURATION_MINS: 'minutes',
  TRACK_DESCRIPTION: 'description',
  TRACK_MARKERS: 'markers',
  MARKER_TITLE: 'title',
  MARKER_DESCRIPTION: 'description',
  MARKER_LONGITUDE: 'longitude',
  MARKER_LATITUDE: 'latitude',
  MARKER_LOCATION: 'location',
  RELIEF: 'relief',
  DURATION: 'duration',
  RATING: 'rating',
};

export const LOCAL_STORAGE_KEYS: LocalStorageKeys = {
  ACCESS_TOKEN: 'accessToken',
};

export const initialMarkerMapRegion = {
  latitude: 54.8985,
  longitude: 23.9036,
  latitudeDelta: 20,
  longitudeDelta: 20,
};

export const TrackCardIcons: CardIcons = {
  CITY: CityIcon,
  COUNTRYSIDE: CountrysideIcon,
  'OFF-ROAD': OffroadIcon,
};
