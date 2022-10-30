import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from './../../service/api'

import { colors } from './../../assets/colors'
import styles from './styles'

const InfoScreen = props => {
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
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
                        <View style={styles.readOnlyDeviceIdContainer}>
                            <Text style={styles.readOnlyText}>{deviceId}</Text>
                        </View>
                        <View style={styles.editButtonContainer}>
                            <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.editButtonText}>edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.saveContainer}>
                    <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                            save()
                        }}>
                        <Text style={styles.text}>save</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                            }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeaderContainer}>
                                <View style={styles.modalHeaderText}>
                                    <Text style={styles.text}>edit device id</Text>
                                </View>
                                <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <Icon style={styles.modalIcon} name="times" size={20} color={colors.darkRed} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalContentContainer}>
                                <View style={styles.modalTextContainer}>
                                    <Text style={[styles.smallText, {textAlign: 'center'}]}>type in here the id number from your device's box:</Text>
                                </View>
                                <View style={styles.modalInputContainer}>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder='device id'
                                        placeholderTextColor={colors.lightRed}
                                        textAlign={'center'}
                                        onChangeText={t => {setDeviceId(t)}}
                                    />
                                </View>
                            </View>
                            <View style={styles.modalFooterContainer}>
                                <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <Text style={styles.text}>ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

            </View>
        </View>
    );
}

export default InfoScreen;
