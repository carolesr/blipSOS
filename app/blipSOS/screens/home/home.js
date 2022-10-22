import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const HomeScreen = props => {

    return (
        <View>

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
    );
}

export default HomeScreen;
