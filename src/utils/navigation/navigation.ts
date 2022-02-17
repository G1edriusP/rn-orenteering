import { CommonActions } from "@react-navigation/native";

export const resetNavigation = (name: string, params?: object): CommonActions.Action =>
  CommonActions.reset({
    index: 0,
    routes: [{ name, params }],
  });
