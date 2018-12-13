import { PermissionsAndroid } from 'react-native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Kwigo needs to access your location',
        'message': 'Kwigo needs to know where you are to get you safely to your driver'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
    } else {
      console.log("Location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

export default requestLocationPermission;
