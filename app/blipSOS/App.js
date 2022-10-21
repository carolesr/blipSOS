/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { getAllUsers, getUser } from './graphql/queries';
import { updateUserName } from './graphql/mutations';
Amplify.configure(awsconfig);

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  console.log('before test')
  testMutation()
  // testQuery()

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
