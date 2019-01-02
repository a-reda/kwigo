import gql from "graphql-tag";

import { client } from './config';

const createUser = (user) => {
    const CREATE_USER = gql`
    mutation CreateUser($email: String! $password: String!) {
      createUser(email: $email, password: $password) {
        code
        text
      }
    }
    `

    return client.mutate({ mutation: CREATE_USER, variables: user}).then(res => {
      return res.data.createUser
    }).catch((err) => console.log(err))
}


export default {
  createUser: createUser
}
