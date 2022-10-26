/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($email: String!, $name: String!, $phone: String!) {
    createUser(email: $email, name: $name, phone: $phone) {
      name
      email
      phone
      password
      deviceId
      contacts {
        name
        phone
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $email: String!
    $name: String!
    $phone: String!
    $password: String!
  ) {
    updateUser(email: $email, name: $name, phone: $phone, password: $password) {
      name
      email
      phone
      password
      deviceId
      contacts {
        name
        phone
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUserDevice = /* GraphQL */ `
  mutation UpdateUserDevice($email: String!, $deviceId: String!) {
    updateUserDevice(email: $email, deviceId: $deviceId) {
      name
      email
      phone
      password
      deviceId
      contacts {
        name
        phone
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUserContacts = /* GraphQL */ `
  mutation UpdateUserContacts($email: String!, $contacts: [ContactInput]) {
    updateUserContacts(email: $email, contacts: $contacts) {
      name
      email
      phone
      password
      deviceId
      contacts {
        name
        phone
      }
      createdAt
      updatedAt
    }
  }
`;
