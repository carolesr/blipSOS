/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($email: String!) {
    getUser(email: $email) {
      name
      email
      phone
      deviceId
      message
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
      deviceId
      message
      contacts {
        name
        phone
      }
      createdAt
      updatedAt
    }
  }
`;
