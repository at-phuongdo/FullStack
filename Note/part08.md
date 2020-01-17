Combined query can also use the same query multiple times. You must however give the queries alternative names like so

```
query {
  havePhone: allPersons(phone: YES){
    name
  }
  phoneless: allPersons(phone: NO){
    name
  }
}
```

# Graphql Server
## Apollo Server
```
npm install --save apollo-server graphql
```

Initial code:

```
const { ApolloServer, gql } = require('apollo-server')

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },...
]

const typeDefs = gql`
  type Person {
    name: String!
    phone: String
    street: String!
    city: String! 
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
```
# React & Graphql

## ApolloProvider

- ApolloProvider cung cấp 1 thể hiện của ApolloClient tới cho tất cả các component con của nó, giúp cho các component con của nó sử dụng HOC(High Order Component) graphql có thể hoạt động được.

- Makes the GraphQL client available to any of your components enhanced by the graphql() function. The <ApolloProvider/> component works the same as the react-redux <Provider/> component
The <ApolloProvider/> component takes the following props:

    -client: The required ApolloClient instance. This ApolloClient instance will be used by all of your components enhanced with GraphQL capabilties.

## ApollpConsumer
To access the client directly, create an ApolloConsumer component and provide a render prop function as its child. The render prop function will be called with your ApolloClient instance as its only argument. You can think of the ApolloConsumer component as similar to the Consumer component from the new React context API.

## Refetch after mutation
 There are 2 ways:
 - pollInterval
  ```
<Query query={ALL_PERSONS} pollInterval={2000}>
  ```
 - refetchQueries 

  ```
<Mutation mutation={CREATE_PERSON} refetchQueries={[{ query: ALL_PERSONS }]}>