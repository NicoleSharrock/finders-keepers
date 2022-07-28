import { gql } from '@apollo/client';

export const QUERY_THOUGHTS = gql`
  query items($username: String) {
    items(username: $username) {
      _id
      itemName
      Location
    }
  }
`;

export const QUERY_ITEM = gql`
  query items($id: ID!) {
    item(_id: $id) {
      _id
      itemName
      itemLocation
      createdAt
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      items {
        _id
        itemName
        itemLocation
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
<<<<<<< HEAD
      items {
=======
      thoughts {
>>>>>>> a75a5cbbd7ad0f2517640b93f23c8dcf68bca877
        _id
        itemName
        itemLocation
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;
