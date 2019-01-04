

function getCoordinates(location) {
    return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
}

function getDepArrCoordinates(dep, arr) { 
  if(dep && arr) {
  return {
    departure: {
      latitude: dep.latitude,
      longitude: dep.longitude
    },
    arrival: {
      latitude: arr.latitude,
      longitude: arr.longitude
    }
  }}
  else return null;
}

export default {
  getCoordinates: getCoordinates,
  getDepArrCoordinates: getDepArrCoordinates
}
