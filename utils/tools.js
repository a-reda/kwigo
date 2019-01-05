function prepareTrip(s) {
  return {
      departure: {
        city: s.departure.city,
        latitude: s.departure.latitude,
        longitude: s.departure.longitude,
        address: s.departure.address,
        name: s.departure.name,
      },
      arrival: {
        city: s.arrival.city,
        latitude: s.arrival.latitude,
        longitude: s.arrival.longitude,
        address: s.arrival.address,
        name: s.arrival.name,
      },
      passengersCount: s.passengersCount,
      price: parseInt(s.price),
      date: (new Date(s.date)).getTime()
  }


}

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

function getDepartureDate(d) {
  return `${addZero(d.getDate())}/${addZero(d.getMonth()+1)}/${d.getFullYear()}`
}

function getDepartureTime(d) {
  return `${addZero(d.getHours())}:${addZero(d.getMinutes())}`
}

function addZero(n) {
  return ((n<10) ? "0" : "") + n.toString();
}

function getFormatedDate(d) {
  return `${getDepartureTime(d)} - ${getDepartureDate(d)}`
}

export default {
  getCoordinates: getCoordinates,
  getDepArrCoordinates: getDepArrCoordinates,
  prepareTrip: prepareTrip,
  getFormatedDate: getFormatedDate
}
