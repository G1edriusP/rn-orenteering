import Geolocation, { ErrorCallback, GeoCoordinates, SuccessCallback } from "react-native-geolocation-service";

import { hasLocationPermission } from "./permissions";
import { LatLng } from "react-native-maps";

export const getLocation = async (onSuccess: SuccessCallback, onError: ErrorCallback) => {
  const hasPermission = await hasLocationPermission();
  if (!hasPermission) return;

  Geolocation.getCurrentPosition(onSuccess, onError, {
    accuracy: {
      android: "high",
      ios: "best",
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

export const getLocationUpdates = async (watchId, onSuccess: SuccessCallback, onError: ErrorCallback) => {
  const hasPermission = await hasLocationPermission();
  if (!hasPermission) return;

  watchId.current = Geolocation.watchPosition(onSuccess, onError, {
    accuracy: {
      android: "high",
      ios: "best",
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

export const measureDistance = (currentLocation: GeoCoordinates, markerLocation: LatLng) => {
  const earthRadius = 6378.137;
  const distanceLat = (markerLocation.latitude * Math.PI) / 180 - (currentLocation.latitude * Math.PI) / 180;
  const distanceLon = (markerLocation.longitude * Math.PI) / 180 - (currentLocation.longitude * Math.PI) / 180;
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

export const measureDistance2 = (currentLocation: GeoCoordinates, markerLocation: LatLng) => {
  console.log(currentLocation, markerLocation);
  const fi1 = (currentLocation.latitude * Math.PI) / 180,
    fi2 = (markerLocation.latitude * Math.PI) / 180,
    deltaLambda = ((markerLocation.longitude - currentLocation.longitude) * Math.PI) / 180,
    R = 6371e3;
  const d = Math.acos(Math.sin(fi1) * Math.sin(fi2) + Math.cos(fi1) * Math.cos(fi2) * Math.cos(deltaLambda)) * R;
  return d;
};
