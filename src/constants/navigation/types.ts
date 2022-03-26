import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";
import { Routes, Stacks } from "constants/navigation/routes";
import { TrackData } from "constants/types/types";

// Navigators
export type RootStackParams = {
  [Routes.SPLASH_SCREEN]: undefined;
  [Routes.LOGIN_SCREEN]: undefined;
  [Routes.REGISTER_SCREEN]: undefined;
  [Stacks.HOME]: undefined;
};

export type HomeStackParams = {
  [Routes.HOME_SCREEN]: undefined;
  [Routes.TRACK_INFO]: { type: "CREATE" | "EDIT" };
  [Routes.TRACKS_SCREEN]: { tracks: TrackData[] };
  [Routes.TRACKS_MAP_SCREEN]: { infoType: "MY_TRACKS" | "OTHER_TRACKS" };
  [Routes.TRACK_SCREEN_COGNITIVE]: { track: TrackData };
  [Routes.TRACK_SCREEN_INDICATIVE]: { track: TrackData };
  [Routes.WAITING_ROOM]: { trackID: string | undefined };
};

// Screen props
export type SplashScreenProps = StackScreenProps<RootStackParams, Routes.SPLASH_SCREEN>;
export type HomeScreenProps = StackScreenProps<HomeStackParams, Routes.HOME_SCREEN>;
export type LoginScreenProps = StackScreenProps<RootStackParams, Routes.LOGIN_SCREEN>;
export type RegisterScreenProps = StackScreenProps<RootStackParams, Routes.REGISTER_SCREEN>;
export type TrackInfoScreenProps = StackScreenProps<HomeStackParams, Routes.TRACK_INFO>;
export type TracksScreenProps = StackScreenProps<HomeStackParams, Routes.TRACKS_SCREEN>;
export type TracksMapScreenProps = StackScreenProps<HomeStackParams, Routes.TRACKS_MAP_SCREEN>;
export type TrackMapCognitiveScreenProps = StackScreenProps<
  HomeStackParams,
  Routes.TRACK_SCREEN_COGNITIVE
>;
export type TrackMapIndicativeScreenProps = StackScreenProps<
  HomeStackParams,
  Routes.TRACK_SCREEN_INDICATIVE
>;
export type WaitingRoomScreenProps = StackScreenProps<HomeStackParams, Routes.WAITING_ROOM>;
