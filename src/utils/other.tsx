import axios, { AxiosResponse } from "axios";
import { MarkerType } from "constants/types/firestore";
import { AlertParams, TrackData } from "constants/types/types";
import React from "react";
import { LatLng } from "react-native-maps";
import EventRegister from "./eventRegister";

export const combineProviders =
  (...providers: any) =>
  ({ children }: any) => {
    return providers.reduceRight((child: any, Provider: any) => <Provider>{child}</Provider>, children);
  };

export const showAlert = (params: AlertParams) => {
  EventRegister.emit("alert", { params });
};

export const createUID = (size?: number): string => {
  const head: string = Date.now().toString(36);
  const tail: string = Math.random().toString(36).substring(2);
  const uid = head + tail;
  return size ? String(uid).substring(uid.length - size, uid.length) : uid;
};

const configureCoordsFetchRoute = (coords: LatLng[]): string => {
  let formatted = "";
  coords.forEach((c, i) => {
    formatted += `${c.longitude},${c.latitude}`;
    if (i !== coords.length - 1) formatted += ";";
  });
  return `https://routing.openstreetmap.de/routed-foot/route/v1/driving/${formatted}`;
};

const coordsFetchParams = {
  alternatives: false,
  annotations: false,
  geometries: "geojson",
  overview: "full",
};

export const fetchCoordinatesBetweenPoints = (
  markers: MarkerType[],
  setCoordinates: React.Dispatch<React.SetStateAction<LatLng[]>>,
): void => {
  if (markers.length > 1) {
    const url = configureCoordsFetchRoute(markers.map(m => m.location));
    axios.get(url, { params: coordsFetchParams }).then((res: AxiosResponse) => {
      const formatted: LatLng[] = [];
      const coords: [] = res.data.routes[0].geometry.coordinates;
      coords.forEach(c => formatted.push({ longitude: c[0], latitude: c[1] } as LatLng));
      setCoordinates(formatted);
    });
  }
};

export const findTracksMinMaxDuration = (tracks: TrackData[]) => {
  const mini = tracks.reduce((prev, curr) => (curr.duration < prev.duration ? curr.duration : prev.duration));
  const maxi = tracks.reduce((prev, curr) => (curr.duration > prev.duration ? curr.duration : prev.duration));
  return [mini / 3600, maxi / 3600];
};
