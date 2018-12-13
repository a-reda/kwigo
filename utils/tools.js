


function getCoordinates(location) {
    return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
}


export default {
  getCoordinates: getCoordinates
}
