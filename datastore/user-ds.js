import gql from "graphql-tag";

import { client } from './config';

const createUser = (user) => {
    const CREATE_USER = gql`
    mutation CreateUser($email: String!, $password: String!, $name: String!, $phone_number:String!, $car: String!){
    createUser(email: $email,
    				   password: $password,
  					   name: $name,
               phone_number:$phone_number,
  					   car: $car) {
                code
                text
  }
}
  `
    console.log(user)
    return client.mutate({ mutation: CREATE_USER, variables: user}).then(res => {
      return res.data.createUser
    }).catch((err) => console.log(err))
}

const getUser = async (id) => {
    const GET_USER = gql`
        {
          user(id:  \"${id}\")
          {name email phone_number car}
        }
  `
    return client.query({ query: GET_USER, fetchPolicy: 'no-cache'}).then(res => {
      return res.data.user;
    })
}



export default {
  createUser: createUser,
  getUser: getUser
}
