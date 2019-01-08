import ApolloClient from "apollo-boost";
import { AsyncStorage } from 'react-native';

//const backend = "http://camus.duckdns.org:4000/graphql"
const backend = "http://192.168.1.128:4000/graphql"

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
