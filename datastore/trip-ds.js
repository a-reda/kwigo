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

export default {
  createTrip: createTrip,
  getMyTrips: getMyTrips,
}
