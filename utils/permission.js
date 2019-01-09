import { PermissionsAndroid } from 'react-native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Kwigo needs to access your location',
        'message': 'Kwigo needs to know where you are to get you to your driver'
      }
    )
    return (granted === PermissionsAndroid.RESULTS.GRANTED)
  } catch (err) {
    console.warn(err)
  }
}

export default requestLocationPermission;
