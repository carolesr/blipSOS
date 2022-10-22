import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './stackNavigator'

import { colors } from '../assets/colors'
import LoginScreen from '../screens/login/login'

const Navigator = props => {

    const AppTheme = {
        colors: {
          background: colors.red
        },
      };
  
    return (
        <NavigationContainer theme={ AppTheme } >
          <StackNavigator />
      </NavigationContainer>
    )
};

export default Navigator;
