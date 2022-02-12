import React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Navigators
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { Routes, Stacks } from "constants/navigation/routes";

// Types
import { AuthStackParams, HomeStackParams, RootStackParams } from "constants/navigation/types";

// Root stack
import SplashScreen from "containers/SplashScreen";
// Auth stack
import LoginScreen from "containers/Auth/LoginScreen";
import RegisterScreen from "containers/Auth/RegisterScreen";
// Home Stack
import HomeScreen from "containers/HomeScreen";

const Root = createStackNavigator<RootStackParams>();
const Auth = createStackNavigator<AuthStackParams>();
const Home = createStackNavigator<HomeStackParams>();

const noHeader: StackNavigationOptions = { headerShown: false, gestureEnabled: false };

const HomeStack = () => {
  return (
    <Home.Navigator>
      <Home.Screen name={Routes.HOME_SCREEN} component={HomeScreen} options={noHeader} />
    </Home.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Auth.Navigator initialRouteName={Routes.LOGIN_SCREEN}>
      <Auth.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} options={noHeader} />
      <Auth.Screen name={Routes.REGISTER_SCREEN} component={RegisterScreen} options={noHeader} />
      <Auth.Screen name={Stacks.HOME} component={HomeStack} options={noHeader} />
    </Auth.Navigator>
  );
};

const RootStack = () => {
  return (
    <Root.Navigator initialRouteName={Routes.SPLASH_SCREEN}>
      <Root.Screen name={Routes.SPLASH_SCREEN} component={SplashScreen} />
      <Root.Screen name={Stacks.AUTH} component={AuthStack} options={noHeader} />
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
