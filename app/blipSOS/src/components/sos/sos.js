import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from './../../assets/colors'
import styles from './styles'

const Sos = props => {

    const [email, setEmail] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [datetime, setDatetime] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (props != undefined) {
            setEmail(props.email)
            setDeviceId(props.deviceId)
            setLocation(props.location)
            setDate(formatDate(props.datetime))
            setTime(formatTime(props.datetime))
            setDatetime(props.datetime)
            setId(props.id)
        }
    }, [props])

    const formatDate = datetime => {
        const dt = new Date(datetime)
        return `${dt.getDate()}/${dt.getMonth()+1}/${dt.getFullYear()}`
    }
    
    const formatTime = datetime => {
        const dt = new Date(datetime)
        return `${dt.getHours()}h${dt.getMinutes()}m${dt.getSeconds()}`
    }

    return (
        <View style={styles.contactContainer}>
            <View style={styles.fieldsContainer}>
                <View style={styles.nameContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.smallText}>device id: {deviceId}</Text>
                        <Text style={styles.smallText}>when: {date} - {time}</Text>
                        <Text style={styles.smallText}>original: {datetime}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Sos;
