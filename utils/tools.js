// // var NodeGeocoder = require('node-geocoder')
// //
// // var options = {
// //   provider: 'google',
// //   apiKey: '***REMOVED***'
// // };
// //
// // var geocoder = NodeGeocoder(options);
// //
// // function getCityName(lat, lon) {
// //
// //   return geocoder.reverse({lat: lat, lon: lon}).then(function(res) {
// //     console.log(res);
// //     return  res[0].city;
// //   })
// //   .catch(function(err) {
// //     console.log(err);
// //   });
//
// }

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
