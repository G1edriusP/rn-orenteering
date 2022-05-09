import Geolocation, {
  ErrorCallback,
  GeoCoordinates,
  GeoPosition,
  SuccessCallback,
} from 'react-native-geolocation-service';

import { hasLocationPermission } from './permissions';
import { Platform } from 'react-native';
import { LatLng } from 'react-native-maps';

export const getLocation = async (
  onSuccess: SuccessCallback,
  onError: ErrorCallback
) => {
  const hasPermission = await hasLocationPermission();
  if (!hasPermission) return;

  Geolocation.getCurrentPosition(onSuccess, onError, {
    accuracy: {
      android: 'high',
      ios: 'best',
    },
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 10000,
    distanceFilter: 0,
    forceRequestLocation: true,
    forceLocationManager: false,
    showLocationDialog: true,
  });
};

// export const startForegroundService = async () => {
//   if (Platform.Version >= 26) {
//     await VIForegroundService.createNotificationChannel({
//       id: "locationChannel",
//       name: "Location Tracking Channel",
//       description: "Tracks location of user",
//       enableVibration: false,
//     });
//   }

//   return VIForegroundService.startService({
//     channelId: "locationChannel",
//     id: 420,
//     title: "Orientuokis",
//     text: "Tracking location updates",
//     icon: "ic_launcher",
//   });
// };

export const getLocationUpdates = async (
  watchId,
  onSuccess: SuccessCallback,
  onError: ErrorCallback
) => {
  const hasPermission = await hasLocationPermission();
  if (!hasPermission) return;

  // if (Platform.OS === "android") await startForegroundService();

  watchId.current = Geolocation.watchPosition(onSuccess, onError, {
    accuracy: {
      android: 'high',
      ios: 'best',
    },
    enableHighAccuracy: true,
    distanceFilter: 0,
    interval: 5000,
    fastestInterval: 2000,
    forceRequestLocation: true,
    forceLocationManager: false,
    showLocationDialog: true,
    useSignificantChanges: false,
  });
};

// export const stopForegroundService = () => {
//   VIForegroundService.stopService().catch(err => err);
// };

// export const removeLocationUpdates = watchId => {
//   if (watchId.current !== null) {
//     stopForegroundService();
//     Geolocation.clearWatch(watchId.current);
//     watchId.current = null;
//   }
// };

export const measureDistance = (
  currentLocation: GeoCoordinates,
  markerLocation: LatLng
) => {
  const earthRadius = 6378.137;
  const distanceLat =
    (markerLocation.latitude * Math.PI) / 180 -
    (currentLocation.latitude * Math.PI) / 180;
  const distanceLon =
    (markerLocation.longitude * Math.PI) / 180 -
    (currentLocation.longitude * Math.PI) / 180;
  const a =
    Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
    Math.cos((currentLocation.latitude * Math.PI) / 180) *
      Math.cos((markerLocation.latitude * Math.PI) / 180) *
      Math.sin(distanceLon / 2) *
      Math.sin(distanceLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = earthRadius * c;
  return d * 1000;
};

export const measureDistance2 = (
  currentLocation: GeoCoordinates,
  markerLocation: LatLng
) => {
  console.log(currentLocation, markerLocation);
  const fi1 = (currentLocation.latitude * Math.PI) / 180,
    fi2 = (markerLocation.latitude * Math.PI) / 180,
    deltaLambda =
      ((markerLocation.longitude - currentLocation.longitude) * Math.PI) / 180,
    R = 6371e3;
  const d =
    Math.acos(
      Math.sin(fi1) * Math.sin(fi2) +
        Math.cos(fi1) * Math.cos(fi2) * Math.cos(deltaLambda)
    ) * R;
  return d;
};
