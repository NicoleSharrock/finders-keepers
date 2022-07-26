const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    items: [Item]
  }

  type Item {
    _id: ID
    itemName: String
    itemLocation: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    items(username: String): [Item]
    item(_id: ID!): Item
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addItem(itemName: String!, itemLocation: String!): Item
    removeItem(_id: ID!): Item
  }
`;

module.exports = typeDefs;
