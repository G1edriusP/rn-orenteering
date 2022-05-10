import { Linking, PermissionsAndroid, Platform, ToastAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { showAlert } from 'utils/other';

const openSettings = () => {
  Linking.openSettings().catch(() => {
    showAlert({ title: 'Unable to open settings', cancel: 'Back' });
  });
};

const hasPermissionIOS = async () => {
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') return true;
  if (status === 'denied') showAlert({ title: 'Location permission denied' });
  if (status === 'disabled')
    showAlert({
      title: 'Turn on Location Services',
      message: 'Turn on Location Services to allow "Orientuokis" to determine your location.',
      ok: 'Go to Settings',
      onOk: openSettings,
      cancel: "Don't Use Location",
    });

  return false;
};

export const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermissions = await hasPermissionIOS();
    return hasPermissions;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) return true;

  const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  if (hasPermission) return true;

  const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
  }

  return false;
};
