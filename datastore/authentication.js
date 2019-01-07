import gql from "graphql-tag";

import { client } from './config';

const validateToken = (token) => {
  const VALIDATE_TOKEN = gql`
  {
  userByToken(token: \"${token}\")
      {
        name
        email
        password
      }
    }
  `
  return client.query({query: VALIDATE_TOKEN})
          .then(res => res.data.userByToken).catch((err) => {
            console.log(err)
          })
}

const login = (email, password) => {
    const LOGIN = gql`
    mutation Login($email: String! $password: String!) {
      login(email: $email, password: $password) {
        code
        text
      }
    }
    `
    // console.log(LOGIN)
    return client.mutate({ mutation: LOGIN, variables: {email: email, password: password}}).then(res => {
      console.log(res.data.login)
      return res.data.login
    }).catch((err) => console.log(err))
}

export default {
  validateToken: validateToken,
  login: login
}
