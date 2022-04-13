import { CommonActions } from "@react-navigation/native";

export const resetNavigation = (
  routes: Array<{ name: string; params?: object }>,
  index: number = 0,
): CommonActions.Action => {
  return CommonActions.reset({ index, routes });
};
