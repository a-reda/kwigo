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
        id
        departure{city} arrival{city} driver{name} date price}
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
        id
        departure{city} arrival{city} driver{name} date price}
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
        driver{name car} date price
        passengersCount
        passengers {name}
      }

    }
  `
    console.log(FIND_TRIP)
    return client.query({ query: FIND_TRIP, fetchPolicy: 'no-cache'}).then(res => {
      console.log(res);
      return res.data.findTripById;
    }).catch((err) => console.log(err))
}

export default {
  createTrip: createTrip,
  getMyTrips: getMyTrips,
  searchTrips: searchTrips,
  findTripById: findTripById,
  registeredTrips: registeredTrips
}
