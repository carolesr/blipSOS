
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './../../aws-exports';
import { getAllUsers, getUser } from './../graphql/queries';
import { updateUser } from './../graphql/mutations';

Amplify.configure(awsconfig);

const getUserQuery = email => {
    console.log('test query')
    return API.graphql(graphqlOperation(getUser, {email: email}))
}

const updateUserMutation = input => {
    console.log('test mutation: ', input)
    return API.graphql(graphqlOperation(updateUser, input))
}

const api = {
    getUser: getUserQuery,
    updateUser: updateUserMutation
}

  export default api