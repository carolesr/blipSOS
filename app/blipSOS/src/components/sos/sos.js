import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import { colors } from './../../assets/colors'
import styles from './styles'

const Sos = props => {

    const [email, setEmail] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [location, setLocation] = useState({lat: 0, lon: 0});
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [datetime, setDatetime] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (props != undefined) {
            setEmail(props.email)
            setDeviceId(props.deviceId)
            setLocation(formatLocation(props.location))
            setDate(formatDate(props.datetime))
            setTime(formatTime(props.datetime))
            setDatetime(props.datetime)
            setId(props.id)
            formatLocation(props.location)
        }
    }, [props])

    const formatDate = datetime => {
        const dt = new Date(datetime)
        return `${dt.getDate()}/${dt.getMonth()+1}/${dt.getFullYear()}`
    }
    
    const formatTime = datetime => {
        const dt = new Date(datetime)
        return `${dt.getHours()}h${dt.getMinutes()}m${dt.getSeconds()}s`
    }

    const formatLocation = location => {
        const coords = location.replace('{', '').replace('}', '').replace('lon=', '').replace('lat=', '').split(', ')
        return {
            lon: parseFloat(coords[0]),
            lat: parseFloat(coords[1])
        }
    }

    return (
        <View style={styles.sosContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{date} - {time}</Text>
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    //rotateEnabled={false} //scrollEnabled={false}// zoomEnabled={false} pitchEnabled={false} 
                    style={styles.map}
                    region={{
                        latitude: location.lat,
                        longitude: location.lon,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                <Marker
                    coordinate={{
                        latitude: location.lat,
                        longitude: location.lon,
                    }}
                    />
                </MapView>
            </View>
        </View>
    );
}

export default Sos;
