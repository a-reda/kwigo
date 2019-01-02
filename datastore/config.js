import ApolloClient from "apollo-boost";

const backend = "http://camus.duckdns.org:4000/graphql"

export const client = new ApolloClient({
  uri: backend
});

export default { 
  backend: backend
}
