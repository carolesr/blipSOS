import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from './../../service/api'

import Sos from './../../components/sos/sos'
import { colors } from './../../assets/colors'
import styles from './styles'

const HistoryScreen = props => {
    
    const [list, setList] = useState([]);
    const [listSOS, setListSOS] = useState([]);
    const listRef = useRef(listSOS); 

    useEffect(() => {
        console.log('SOS SCREEN ', props.email)
        getSOS(props.email) 
    }, [])
    
    useEffect(() => {
        if (list.length != 0) {
            const sos = list.map((item, index) => {
                return {
                    'id': index,
                    'email': item.email,
                    'deviceId': item.deviceId,
                    'location': item.location,
                    'datetime': item.datetime
                }
            })
            const sorted = sos.sort((a, b) => b.datetime - a.datetime)
            listRef.current = sos
            setListSOS(sos)
        }
    }, [list])

    const getSOS = email => {
        api.getSosHistory(email)
        .then(result => {
            console.log('get sos query: ')
            setList(result.data.getSosHistory)
        })
        .catch(err => {
            console.log('error get sos')
            console.log(err)    
        });
    }

    const save = () => {
        // const input = {
        //     email: email,
        //     contacts: listContacts.map(c => {
        //         return {
        //             name: c.name,
        //             phone: c.phone
        //         }
        //     })
        // }
        // api.updateUserContacts(input)
        // .then(result => {
        //     console.log('api then mutation')
        //     console.log(result.data)
        // })
        // .catch(err => {
        //     console.log('error update user')
        //     console.log(err)
    
        // });
    }

    return (
        <View style={styles.screen}>
            <View style={styles.container}>

                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.text}>history of SOS</Text>
                        <Icon style={styles.icon} name="home" size={20} color={colors.darkRed} />
                    </View>
                    
                    {(listSOS.length > 0) ? (
                    <View style={styles.scrollContainer}>
                        <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true}>
                            {listSOS.map(sos => {
                                return (
                                    <Sos
                                        key={sos.id}
                                        id={sos.id}
                                        email={sos.email}
                                        deviceId={sos.deviceId}
                                        location={sos.location}
                                        datetime={sos.datetime}
                                    />
                                )
                            })}
                        </ScrollView>  
                    </View>
                    ) : (
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.smallText}>you don't have any sos et</Text>
                        </View>
                    )}                    
                </View>
            </View>
        </View>
    );
}

export default HistoryScreen;
