/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import Navigator from './navigation/navigator';

import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { getAllUsers, getUser } from './graphql/queries';
import { updateUserName } from './graphql/mutations';
Amplify.configure(awsconfig);

const App: () => Node = () => {
  console.log('before test')
  //testMutation()
  // testQuery()

  return (
    <Navigator />
  );
};

const testQuery = async () => {
  console.log('test query')
  const result = await API.graphql(graphqlOperation(getAllUsers, null))
    .then(a => {
      console.log('then query')
      console.log(a.data)
    })
    .catch(err => {
      console.log('catch query')
      console.log(err)

    });
  // console.log(result)
}

const testQueryGetUser = async () => {
  console.log('test query get user')
  const result = await API.graphql(graphqlOperation(getUser, {email: 'aaaa'}))
    .then(a => {
      console.log('then query get user')
      console.log(a.data)
    })
    .catch(err => {
      console.log('catch query get user')
      console.log(err)

    });
  // console.log(result)
}

const testMutation = async () => {
  console.log('test mutation')
  inp = {
    email: 'aaaa',
    name: 'test from appasdsadsadfsaaf'
  }
  console.log('input: ', inp)
  const result = await API.graphql(graphqlOperation(updateUserName, inp))
    .then(a => {
      console.log('then mutation')
      console.log(a.data)
      testQueryGetUser()
    })
    .catch(err => {
      console.log('catch mutation')
      console.log(err)

    });
  // console.log(result)
}

export default App;
