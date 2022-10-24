import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/home/home'
import InfoScreen from '../screens/info/info'
import Header from '../components/header/header'
import { colors } from '../assets/colors'

const TabNavigator = props => {

  const Tab = createBottomTabNavigator();

  const navigatorOptions = {
    tabBarStyle: {
      height: 60,
      overflow:'hidden',
    },
  }

  const screenOptions = (icon, label, v = true) => {
    return {
        tabBarActiveTintColor: colors.white,
        tabBarInactiveBackgroundColor: colors.darkRed,
        tabBarActiveBackgroundColor: colors.lightDarkRed,
        tabBarLabel: () => (
            <Text style={{ fontWeight: 'bold', color: colors.white, paddingBottom: 5 }}> {label} </Text>
        ),
        tabBarIcon: () => (
            <Icon style={{ paddingTop: 5 }} name={icon} size={25} color={ colors.white } />
        ),
        header: () => (
            <Header />
        ),
        bottomTabs: {
            visible: false
        }
    }
  }

    return (
        <Tab.Navigator screenOptions={ navigatorOptions }>
            <Tab.Screen
                name="info"
                children={() => <InfoScreen /> }
                options={ screenOptions('user', 'my info', false)}
            />
            <Tab.Screen
                name="contacts"
                children={() => <HomeScreen /> }
                options={ screenOptions('phone', 'contacts') }
            />
            <Tab.Screen
                name="history"
                children={() => <HomeScreen /> }
                options={ screenOptions('history', 'history') }
            />
            <Tab.Screen
                name="settings"
                children={() => <HomeScreen /> }
                options={ screenOptions('cog', 'settings') }
            />
        </Tab.Navigator>
    )
};

export default TabNavigator;
