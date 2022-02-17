import React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Navigators
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { Routes, Stacks } from "constants/navigation/routes";

// Types
import { HomeStackParams, RootStackParams } from "constants/navigation/types";

// Root stack
import SplashScreen from "containers/SplashScreen";
// Auth stack
import LoginScreen from "containers/Auth/LoginScreen";
import RegisterScreen from "containers/Auth/RegisterScreen";
// Home Stack
import HomeScreen from "containers/HomeScreen";

const Root = createStackNavigator<RootStackParams>();
const Home = createStackNavigator<HomeStackParams>();

const noHeader: StackNavigationOptions = { headerShown: false, gestureEnabled: false };

const HomeStack = () => {
  return (
    <Home.Navigator initialRouteName={Routes.HOME_SCREEN}>
      <Home.Screen name={Routes.HOME_SCREEN} component={HomeScreen} options={noHeader} />
    </Home.Navigator>
  );
};

const RootStack = () => {
  return (
    <Root.Navigator initialRouteName={Routes.SPLASH_SCREEN}>
      <Root.Screen name={Routes.SPLASH_SCREEN} component={SplashScreen} options={noHeader} />
      <Root.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} options={noHeader} />
      <Root.Screen name={Routes.REGISTER_SCREEN} component={RegisterScreen} options={noHeader} />
      <Root.Screen name={Stacks.HOME} component={HomeStack} options={noHeader} />
    </Root.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
