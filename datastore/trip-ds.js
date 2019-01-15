import gql from "graphql-tag";

import { client } from './config';

const createTrip = async (trip) => {
    const CREATE_TRIP = gql`
    mutation ($departure: PlaceInput, $arrival: PlaceInput, $passengersCount: Int, $price: Int, $date: Float){
    createTrip(departure: $departure,
    				   arrival: $arrival,
  					   passengersCount: $passengersCount,
               price:$price,
  					   date: $date ){
                code
                text
              }
            }
  `

    return client.mutate({ mutation: CREATE_TRIP, variables: trip}).then(res => {
      return res.data.createTrip;
    })
}

const getMyTrips = async (trip) => {
    const GET_MY_TRIPS = gql`
    {
      getMyTrips{
        id departure{city latitude longitude name}
          arrival{city latitude longitude name}
          driver{id name car} date price
          passengersCount
          passengers {id name}
        }
    }
  `
    return client.query({ query: GET_MY_TRIPS, fetchPolicy: 'no-cache'}).then(res => {
      return res.data.getMyTrips;
    })
}

const registeredTrips = async (trip) => {
    const REGISTRED_TRIPS = gql`
    {
      registeredTrips{
        id departure{city latitude longitude name}
          arrival{city latitude longitude name}
          driver{id name car} date price
          passengersCount
          passengers {id name}
        }
    }
  `
    return client.query({ query: REGISTRED_TRIPS, fetchPolicy: 'no-cache'}).then(res => {
      return res.data.registeredTrips;
    })
}

const searchTrips = (departure, arrival, date) => {
    const SEARCH_TRIPS = gql`
    {
      searchTrips(departure: \"${departure}\", arrival: \"${arrival}\",
      					   date:${date.getTime()})
      { id departure{city name} arrival{city name} driver{name} date price }

    }
  `
    return client.query({ query: SEARCH_TRIPS, fetchPolicy: 'no-cache'}).then(res => {
      return res.data.searchTrips;
    })
}

const findTripById = (id) => {
    const FIND_TRIP = gql`
    {
      findTripById(id: \"${id}\")
      { id departure{city latitude longitude name}
        arrival{city latitude longitude name}
        driver{id name car} date price
        passengersCount
        passengers {id name}
      }

    }
  `
    console.log(FIND_TRIP)
    return client.query({ query: FIND_TRIP, fetchPolicy: 'no-cache'}).then(res => {
      return res.data.findTripById;
    })
}

const registerTrip = (tripId) => {
    const REGISTER = gql`
    mutation registerTrip($tripId: String!) {
      register(tripId: $tripId) {
        code text
      }
    }
    `
    return client.mutate({ mutation: REGISTER, variables: {tripId: tripId}}).then(res => {
      return res.data.register
    }).catch((err) => console.log(err))
}

const deleteTrip = (tripId) => {
    const DELETE = gql`
    mutation deleteTrip($tripId: String!) {
      deleteTrip(tripId: $tripId) {
        code text
      }
    }
    `
    return client.mutate({ mutation: DELETE, variables: {tripId: tripId}}).then(res => {
      console.log(res.data.deleteTrip)
      return res.data.deleteTrip
    }).catch((err) => console.log(err))
}

const leaveTrip = (tripId) => {
    const LEAVE = gql`
    mutation leaveTrip($tripId: String!) {
      leaveTrip(tripId: $tripId) {
        code text
      }
    }
    `
    return client.mutate({ mutation: LEAVE, variables: {tripId: tripId}}).then(res => {
      console.log(res.data.leaveTrip)
      return res.data.leaveTrip
    }).catch((err) => console.log(err))
}

const setPosition = (latitude, longitude) => {
    const SET_POSITION = gql`
    mutation setPosition($latitude: Float!, $longitude: Float!) {
      setPosition(latitude: $latitude, longitude: $longitude) {
        code text
      }
    }
    `
    return client.mutate({ mutation: SET_POSITION, variables: {latitude: latitude, longitude: longitude}}).then(res => {
      return res.data.setPosition
    }).catch((err) => console.log(err))
}

const getPositions = (tripId) => {
    const GET_POSITIONS = gql`
    {
      getPositions(tripId: \"${tripId}\")
      { latitude longitude userId }
    }
  `
    return client.query({ query: GET_POSITIONS, fetchPolicy: 'no-cache'}).then(res => {
      return res.data.getPositions;
    })
}



export default {
  createTrip: createTrip,
  getMyTrips: getMyTrips,
  searchTrips: searchTrips,
  findTripById: findTripById,
  registeredTrips: registeredTrips,
  registerTrip: registerTrip,
  leaveTrip: leaveTrip,
  deleteTrip: deleteTrip,
  setPosition: setPosition,
  getPositions: getPositions
}
