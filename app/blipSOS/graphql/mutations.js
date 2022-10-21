/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($email: String!, $name: String!, $phone: String!) {
    createUser(email: $email, name: $name, phone: $phone) {
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
export const updateUserName = /* GraphQL */ `
  mutation UpdateUserName($email: String!, $name: String!) {
    updateUserName(email: $email, name: $name) {
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
export const updateUserPhone = /* GraphQL */ `
  mutation UpdateUserPhone($email: String!, $phone: String!) {
    updateUserPhone(email: $email, phone: $phone) {
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
export const updateUserDevice = /* GraphQL */ `
  mutation UpdateUserDevice($email: String!, $deviceId: String!) {
    updateUserDevice(email: $email, deviceId: $deviceId) {
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
export const updateUserMessage = /* GraphQL */ `
  mutation UpdateUserMessage($email: String!, $message: String!) {
    updateUserMessage(email: $email, message: $message) {
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
export const updateUserContacts = /* GraphQL */ `
  mutation UpdateUserContacts($email: String!, $contacts: [ContactInput]) {
    updateUserContacts(email: $email, contacts: $contacts) {
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
