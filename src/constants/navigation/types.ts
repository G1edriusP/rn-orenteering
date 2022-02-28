import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";
import { Routes, Stacks } from "constants/navigation/routes";

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
  [Routes.TRACKS_SCREEN]: undefined;
};

// Screen props
export type SplashScreenProps = StackScreenProps<RootStackParams, Routes.SPLASH_SCREEN>;
export type HomeScreenProps = StackScreenProps<HomeStackParams, Routes.HOME_SCREEN>;
export type LoginScreenProps = StackScreenProps<RootStackParams, Routes.LOGIN_SCREEN>;
export type RegisterScreenProps = StackScreenProps<RootStackParams, Routes.REGISTER_SCREEN>;
export type TrackInfoScreenProps = StackScreenProps<HomeStackParams, Routes.TRACK_INFO>;
export type TracksScreenProps = StackScreenProps<HomeStackParams, Routes.TRACKS_SCREEN>;
