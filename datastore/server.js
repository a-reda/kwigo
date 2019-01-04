import gql from "graphql-tag";

import { client } from './config';

const getCityName = (lat, lon) => {
  const GET_CITY_NAME = gql`
  {
  _resolveCity(lat: ${lat}, lon: ${lon})
      {
        code
        text
      }
    }
  `
  return client.query({query: GET_CITY_NAME}).then(res => res.data._resolveCity.text)
}

export default {
  getCityName: getCityName,
}
