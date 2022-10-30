import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from './../../service/api'

import { colors } from './../../assets/colors'
import styles from './styles'

const InfoScreen = props => {
    
    // const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [deviceId, setDeviceId] = useState('');

    useEffect(() => {
        console.log('USE EFFECT INFO SCREEN')
        const user = props.user
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
        setPassword(user.password)
        setDeviceId(user.deviceId)
    }, [])

    const save = () => {
        const input = {
            email: email,
            name: name,
            phone: phone,
            password: password
        }
        api.updateUser(input)
        .then(result => {
            console.log('api then mutation')
            console.log(result.data)
        })
        .catch(err => {
            console.log('error update user')
            console.log(err)
    
        });
    }

    return (
        <View style={styles.screen}>
            <View style={styles.container}>

                <View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.text}>my info</Text>
                        <Icon style={styles.icon} name="user" size={20} color={colors.darkRed} />
                    </View>
                    
                    <View style={styles.infoContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.smallText}>email:</Text>
                        </View>
                        <View style={styles.readOnlyContainer}>
                            <Text style={styles.readOnlyText}>{email}</Text>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.smallText}>name:</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                style={styles.input}
                                value={name}
                                placeholderTextColor={colors.lightRed}
                                onChangeText={t => {setName(t)}}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.infoContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.smallText}>phone:</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                style={styles.input}
                                value={phone}
                                placeholderTextColor={colors.lightRed}
                                onChangeText={t => {setPhone(t)}}
                            />
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.smallText}>password:</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                style={styles.input}
                                value={password}
                                placeholderTextColor={colors.lightRed}
                                secureTextEntry={true}
                                onChangeText={t => {setPassword(t)}}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.infoContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.smallText}>device id:</Text>
                        </View>
                        <View style={styles.readOnlyContainer}>
                            <Text style={styles.readOnlyText}>{deviceId}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.saveContainer}>
                    <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                            console.log('save')
                            save()
                        }}>
                        <Text style={styles.text}>save</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

export default InfoScreen;
