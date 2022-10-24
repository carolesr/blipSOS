import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from './../../assets/colors'
import styles from './styles'

const Header = props => {

    return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                            console.log('home')  
                        }}>
                            <Icon name="home" size={30} color={colors.white} />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('./../../assets/title.png')}
                    />
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                            console.log('sign out')  
                        }}>
                            <Icon name="sign-out" size={30} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
    );
}

export default Header;
