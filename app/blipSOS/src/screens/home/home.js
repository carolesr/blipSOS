import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { colors } from './../../assets/colors'
import styles from './styles'

const HomeScreen = props => {

    return (
        <View elevation={30} style={styles.screen}>
            <View style={styles.container}>

            <View>
                <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAA HOME SCREEN</Text>
            </View>

            <View>
                <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                        console.log('home')  
                    }}>
                    <Text style={{'color': 'black'}}>home</Text>
                </TouchableOpacity>
            </View>
            
            <View>
                <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                        console.log('voltar')  
                        props.navigation.goBack();
                    }}>
                    <Text style={{'color': 'black'}}>voltar</Text>
                </TouchableOpacity>
            </View>

            </View>
        </View>
    );
}

export default HomeScreen;