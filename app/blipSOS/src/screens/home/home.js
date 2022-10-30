import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from './../../service/api'

import { colors } from './../../assets/colors'
import styles from './styles'

const HomeScreen = props => {
    
    const user = props.user

    return (
        <View style={styles.screen}>
            <View style={styles.container}>

                <View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.text}>home</Text>
                        <Icon style={styles.icon} name="home" size={20} color={colors.darkRed} />
                    </View>
                    
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.text}>welcome, {user.name}!</Text>
                        <Text style={styles.mediumText}>stay safe</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Text style={styles.mediumText}>to see and edit your personal data:</Text>
                        <View style={styles.button}>
                            <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                                    props.navigation.navigate('info', { user: user });
                                }}>
                                <View style={styles.buttonText}>
                                    <Text style={[styles.smallText, {color: colors.white}]}>my info</Text>
                                    <Icon style={styles.icon} name="user" size={20} color={colors.white} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Text style={styles.mediumText}>to see and edit your contacts:</Text>
                        <View style={styles.button}>
                            <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                                    props.navigation.navigate('contacts', { user: user });
                                }}>
                                <View style={styles.buttonText}>
                                    <Text style={[styles.smallText, {color: colors.white}]}>contacts</Text>
                                    <Icon style={styles.icon} name="phone" size={20} color={colors.white} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Text style={styles.mediumText}>to see your history of SOS sent:</Text>
                        <View style={styles.button}>
                            <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                                    props.navigation.navigate('history', { user: user });
                                }}>
                                <View style={styles.buttonText}>
                                    <Text style={[styles.smallText, {color: colors.white}]}>history</Text>
                                    <Icon style={styles.icon} name="history" size={20} color={colors.white} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.iconButtonContainer}>
                        <Text style={styles.mediumText}>to log out: </Text>
                        <Icon style={{alignSelf: 'center'}} name="sign-out" size={20} color={colors.red} />
                        <Text style={styles.mediumText}> on top right corner</Text>
                    </View>
                    
                    <View style={styles.iconButtonContainer}>
                        <Text style={styles.mediumText}>to return to home: </Text>
                        <Icon style={{alignSelf: 'center'}} name="home" size={20} color={colors.red} />
                        <Text style={styles.mediumText}> on top left corner</Text>
                    </View>

                    
                </View>

            </View>
        </View>
    );
}

export default HomeScreen;
