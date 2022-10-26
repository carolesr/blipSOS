import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';

import { colors } from './../../assets/colors'
import styles from './styles'

const LoginScreen = props => {

    useEffect(() => {
        console.log('LOGIN SCREEN')
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.screen}>

            <View style={styles.container}>

               <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('./../../assets/logo.png')}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        placeholder='email'
                        placeholderTextColor={colors.lightDarkRed}
                        onChangeText={t => {setEmail(t)}}
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        placeholder='password'
                        placeholderTextColor={colors.lightDarkRed}
                        secureTextEntry={true}
                        onChangeText={p => {setPassword(p)}}
                    />
                </View>

                <View style={styles.textContainer}>
                    <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                            console.log('login')  
                            props.navigation.push('tab');
                        }}>
                        <Text style={styles.text}>login</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.registerContainer}>
                    <Text style={styles.textSmall}>don't have an account yet?</Text>
                    <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                        console.log('register')
                            // props.navigation.push('register')
                        }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.textSmall}>register</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

export default LoginScreen;
