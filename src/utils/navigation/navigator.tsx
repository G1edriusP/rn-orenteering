import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

// Components
import { BackHandler, Platform } from "react-native";
import { Header } from "components";

// Navigators
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackCardInterpolationProps,
  StackCardStyleInterpolator,
  StackHeaderProps,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { Routes, Stacks } from "constants/navigation/routes";

// Types
import { HomeStackParams, RootStackParams, TrackStackParams } from "constants/navigation/types";

// Root stack
import SplashScreen from "containers/SplashScreen";
// Auth stack
import LoginScreen from "containers/Auth/LoginScreen";
import RegisterScreen from "containers/Auth/RegisterScreen";
// Home stack
import HomeScreen from "containers/Home/HomeScreen";
import TrackInfoScreen from "containers/Home/TrackInfo";
import TracksScreen from "containers/Home/TracksScreen";
import TracksmapScreen from "containers/Home/TracksMap";
import TrackCognitiveScreen from "containers/Home/TrackCognitiveScreen";
import TrackIndicativeScreen from "containers/Home/TrackIndicativeScreen";
import WaitingRoomScreen from "containers/Home/WaitingRoomScreen";
import ProfileScreen from "containers/Home/ProfileScreen";
import SettingsScreen from "containers/Home/SettingsScreen";
import EventRegister from "utils/eventRegister";
import { AlertHandle } from "constants/types/types";
// Track stack
import StatisticsScreen from "containers/Track/StatisticsScreen";
import { hasLocationPermission } from "utils/location/permissions";

const Root = createStackNavigator<RootStackParams>();
const Home = createStackNavigator<HomeStackParams>();
const Track = createStackNavigator<TrackStackParams>();

const forFade: StackCardStyleInterpolator = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: { opacity: current.progress },
});
const cardStyleInterpolator: StackCardStyleInterpolator = Platform.select({
  android: CardStyleInterpolators.forFadeFromBottomAndroid,
  default: forFade,
});
const noHeader: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};
const customHeader: StackNavigationOptions = {
  cardStyleInterpolator,
  gestureEnabled: false,
  header: (props: StackHeaderProps) => <Header {...props} />,
};

const TrackStack = () => {
  return (
    <Track.Navigator initialRouteName={Routes.TRACK_SCREEN_STATISTICS} screenOptions={{ cardStyleInterpolator }}>
      <Track.Screen name={Routes.TRACK_SCREEN_STATISTICS} component={StatisticsScreen} options={customHeader} />
    </Track.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Home.Navigator initialRouteName={Routes.HOME_SCREEN} screenOptions={{ cardStyleInterpolator }}>
      <Home.Screen name={Routes.HOME_SCREEN} component={HomeScreen} options={noHeader} />
      <Home.Screen name={Routes.TRACK_INFO} component={TrackInfoScreen} options={customHeader} />
      <Home.Screen name={Routes.TRACKS_SCREEN} component={TracksScreen} options={customHeader} />
      <Home.Screen name={Routes.TRACKS_MAP_SCREEN} component={TracksmapScreen} options={noHeader} />
      <Home.Screen name={Routes.TRACK_SCREEN_COGNITIVE} component={TrackCognitiveScreen} options={noHeader} />
      <Home.Screen name={Routes.TRACK_SCREEN_INDICATIVE} component={TrackIndicativeScreen} options={noHeader} />
      <Home.Screen name={Routes.WAITING_ROOM} component={WaitingRoomScreen} options={customHeader} />
      <Home.Screen name={Routes.PROFILE_SCREEN} component={ProfileScreen} options={customHeader} />
      <Home.Screen name={Routes.SETTINGS_SCREEN} component={SettingsScreen} options={customHeader} />
    </Home.Navigator>
  );
};

const RootStack = () => {
  return (
    <Root.Navigator initialRouteName={Routes.SPLASH_SCREEN} screenOptions={{ cardStyleInterpolator }}>
      <Root.Screen name={Routes.SPLASH_SCREEN} component={SplashScreen} options={noHeader} />
      <Root.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} options={noHeader} />
      <Root.Screen name={Routes.REGISTER_SCREEN} component={RegisterScreen} options={customHeader} />
      <Root.Screen name={Stacks.HOME} component={HomeStack} options={noHeader} />
      <Root.Screen name={Stacks.TRACK} component={TrackStack} options={noHeader} />
    </Root.Navigator>
  );
};

type Props = {
  alertRef: React.MutableRefObject<AlertHandle>;
};

export default ({ alertRef }: Props) => {
  useEffect(() => {
    // @ts-ignore
    const alertListener = EventRegister.addEventListener("alert", ({ params }) => {
      try {
        return alertRef.current.showAlert(params);
      } catch (e) {
        console.log(e);
      }
    });
    return () => {
      EventRegister.removeEventListener(alertListener);
    };
  }, []);

  useEffect(() => {
    const handler = BackHandler.addEventListener("hardwareBackPress", () => true);
    return () => handler.remove();
  }, []);

  useEffect(() => {
    hasLocationPermission();
  }, []);

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
