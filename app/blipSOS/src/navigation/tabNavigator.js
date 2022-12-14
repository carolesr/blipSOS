import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/home/home'
import InfoScreen from '../screens/info/info'
import ContactsScreen from '../screens/contacts/contacts'
import HistoryScreen from '../screens/history/history'
import Header from '../components/header/header'
import { colors } from '../assets/colors'

const TabNavigator = props => {

    const Tab = createBottomTabNavigator();

    const screenOptions = (icon, label) => {
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
            tabBarStyle: {
                height: 60,
                overflow:'hidden',
            },
            header: () => (
                <Header  navigation={props.navigation}/>
            ),
        }
    }

    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarButton: [
                  "home",
                ].includes(route.name)
                  ? () => {
                      return null;
                    }
                  : undefined,
              })}
            >
            <Tab.Screen
                name="home"
                children={() => <HomeScreen user={props.route.params.user} navigation={props.navigation}/> }
                options={ screenOptions('home', 'home') }
            />
            <Tab.Screen
                name="info"
                children={() => <InfoScreen user={props.route.params.user} /> }
                options={ screenOptions('user', 'my info')}
            />
            <Tab.Screen
                name="contacts"
                children={() => <ContactsScreen user={props.route.params.user} /> }
                options={ screenOptions('phone', 'contacts') }
            />
            <Tab.Screen
                name="history"
                children={() => <HistoryScreen email={props.route.params.user.email} /> }
                options={ screenOptions('history', 'history') }
            />
        </Tab.Navigator>
    )
};

export default TabNavigator;
