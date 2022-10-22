import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import TabNavigator from './TabNavigator'
import LoginScreen from '../screens/login/login'
import HomeScreen from '../screens/home/home'

const StackNavigator = props => {
    
  const Stack = createStackNavigator();
  
    return (
        <Stack.Navigator initialRouteName="login" screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="login"
                component={ LoginScreen }
            />
            <Stack.Screen
                name="home"
                component={ HomeScreen }
            />
        </Stack.Navigator>
    )
};

export default StackNavigator;
