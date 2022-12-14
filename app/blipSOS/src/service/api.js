
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './../../aws-exports';
import { getUser, getSosHistory } from './../graphql/queries';
import { updateUser, updateUserContacts } from './../graphql/mutations';

Amplify.configure(awsconfig);

const getUserQuery = email => {
    return API.graphql(graphqlOperation(getUser, {email: email}))
}

const getSosHistoryQuery = email => {
    return API.graphql(graphqlOperation(getSosHistory, {email: email}))
}

const updateUserMutation = input => {
    return API.graphql(graphqlOperation(updateUser, input))
}

const updateUserContactsMutation = input => {
    return API.graphql(graphqlOperation(updateUserContacts, input))
}

const api = {
    getUser: getUserQuery,
    updateUser: updateUserMutation,
    updateUserContacts: updateUserContactsMutation,
    getSosHistory: getSosHistoryQuery
}

  export default api