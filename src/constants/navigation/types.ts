import { StackScreenProps } from "@react-navigation/stack";
import { Routes, Stacks } from "constants/navigation/routes";

// Navigators
export type RootStackParams = {
  [Routes.SPLASH_SCREEN]: undefined;
  [Stacks.AUTH]: undefined;
};

export type AuthStackParams = {
  [Routes.LOGIN_SCREEN]: undefined;
  [Routes.REGISTER_SCREEN]: undefined;
  [Stacks.HOME]: undefined;
};

export type HomeStackParams = {
  [Routes.HOME_SCREEN]: undefined;
};

// Screen props
export type SplashScreenProps = StackScreenProps<RootStackParams, Routes.SPLASH_SCREEN>;
export type HomeScreenProps = StackScreenProps<HomeStackParams, Routes.HOME_SCREEN>;
export type LoginScreenProps = StackScreenProps<AuthStackParams, Routes.LOGIN_SCREEN>;
export type RegisterScreenProps = StackScreenProps<AuthStackParams, Routes.REGISTER_SCREEN>;
