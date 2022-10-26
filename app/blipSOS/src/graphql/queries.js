/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($email: String!) {
    getUser(email: $email) {
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
export const getAllUsers = /* GraphQL */ `
  query GetAllUsers {
    getAllUsers {
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
export const getSosHistory = /* GraphQL */ `
  query GetSosHistory($deviceId: String!) {
    getSosHistory(deviceId: $deviceId) {
      id
      deviceId
      location
      datetime
    }
  }
`;
