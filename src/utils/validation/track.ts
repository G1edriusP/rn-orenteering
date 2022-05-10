import { MarkerType } from 'constants/types/firestore';
import { TrackData } from 'constants/types/types';
import { TFunction } from 'react-i18next';
import { LatLng } from 'react-native-maps';

const checkField = (
  key: string,
  value: string | LatLng,
  t: TFunction,
  isMarker: boolean,
): { next: boolean; problem: { title: string; description: string } } => {
  let next = true;
  const problem: { title: string; description: string } = {
    title: '',
    description: '',
  };
  const updatedKey = isMarker ? `${key}Marker` : `${key}Track`;

  if (key === 'location' && (value.latitude === 0 || value.longitude === 0)) {
    // Check if field is called "location"
    next = false;
    problem.title = t(`trackErrors:${updatedKey}:emptyTitle`) as string;
    problem.description = t(`trackErrors:${updatedKey}:emptyDesc`) as string;
    return { next, problem };
  } else if (value.length === 0) {
    // Check if field is not empty
    next = false;
    problem.title = t(`trackErrors:${updatedKey}:emptyTitle`) as string;
    problem.description = t(`trackErrors:${updatedKey}:emptyDesc`) as string;
    return { next, problem };
  }

  return { next, problem };
};

export const validateField = (
  data: MarkerType | TrackData,
  t: TFunction,
  isMarker: boolean,
): { isValid: boolean; error: { title: string; description: string } } => {
  let isValid = true;
  const error: { title: string; description: string } = {
    title: '',
    description: '',
  };

  Object.entries(data).every(([key, value]) => {
    if ((key === 'markers' && value.length > 0) || key === 'description' || key === 'id' || key === 'uid') return true;
    else if (key === 'markers' && value.length === 0) {
      isValid = false;
      error.title = t('trackErrors:markersTrack:emptyTitle');
      error.description = t('trackErrors:markersTrack:emptyDesc');
      return false;
    }

    const { next, problem } = checkField(key, value, t, isMarker);

    if (next) {
      return true;
    }
    isValid = next;
    error.title = problem.title;
    error.description = problem.description;
    return false;
  });

  return { isValid, error };
};
