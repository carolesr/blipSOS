import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from './../../assets/colors'
import styles from './styles'

const Contact = props => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (props != undefined) {
            setName(props.name)
            setPhone(props.phone)
            setId(props.id)
        }
    }, [props])

    return (
        <View style={styles.contactContainer}>
            <View style={styles.fieldsContainer}>
                <View style={styles.nameContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.smallText}>name:</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            value={name}
                            placeholderTextColor={colors.lightRed}
                            onChangeText={t => {
                                setName(t)
                                props.updateContact(id, t, phone)
                            }}
                        />
                    </View>
                </View>
                <View style={styles.phoneContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.smallText}>phone:</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            value={phone}
                            placeholderTextColor={colors.lightRed}
                            onChangeText={t => {
                                setPhone(t)
                                props.updateContact(id, name, t)
                            }}
                        />
                    </View>
                </View>
            </View>

        <View style={styles.removeContainer}>
            <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                    console.log('remove contact ', id)
                    props.removeContact(id);
                }}>
                <Icon style={styles.icon} name="trash" size={20} color={colors.darkRed} />
            </TouchableOpacity>
        </View>
    </View>
    );
}

export default Contact;
