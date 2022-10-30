import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';

import api from './../../service/api'

import { colors } from './../../assets/colors'
import styles from './styles'

const LoginScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [validLogin, setValidLogin] = useState(false);    

    useEffect(() => {
        console.log('LOGIN SCREEN')
        console.log(email != '' && password != '')
        if (email != '' && password != '') {
            setValidLogin(true)
        }
        else {
            setValidLogin(false)
        }
    })

    const getUser = email => {
        api.getUser(email)
        .then(result => {
            if (result.data.getUser == null) {
                ToastAndroid.show('User not found', ToastAndroid.SHORT)
                return
            }
            setEmail('')
            setPassword('')
            props.navigation.push('tab', {user: result.data.getUser});
        })
        .catch(err => {
            ToastAndroid.show('Error: ' + err, ToastAndroid.SHORT)
            console.log(err)
    
        });
    }

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
                    {console.log('validLogin; ', validLogin)}
                    <TouchableOpacity disabled={!validLogin} activeOpacity={0.4}  onPress={() => {
                            console.log('login')
                            getUser(email)
                        }}>
                        <Text style={[styles.text, validLogin ? styles.valid : styles.notValid]}>login</Text>
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
