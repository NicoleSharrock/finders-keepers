import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ITEM = gql`
mutation AddItem($itemName: String!, $itemLocation: String!) {
  addItem(itemName: $itemName, itemLocation: $itemLocation) {
    _id
    itemName
    itemLocation
    username
  }
}
`;

export const REMOVE_ITEM = gql`
  mutation removeItem($id: ID!) {
    removeItem(id: $id) {
      _id
      username
      items {
        _id
        itemName
        itemLocation
      }
    }
  }
`;
