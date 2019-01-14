import ApolloClient from "apollo-boost";
import { AsyncStorage } from 'react-native';

const backend = "http://camus.duckdns.org/graphql"
// const backend = "http://192.168.2.1:4000/graphql"

export const client = new ApolloClient({
  uri: backend,
  request: (operation) => {
    return AsyncStorage.getItem('userToken').then((userToken)=> {
      operation.setContext({ headers: {authorization: userToken} })
    });
  }
});

export default { 
  backend: backend
}
