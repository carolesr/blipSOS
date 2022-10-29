import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from './../../service/api'

import Contact from './../../components/contact/contact'
import { colors } from './../../assets/colors'
import styles from './styles'

const ContactScreen = props => {
    
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [listContacts, setListContacts] = useState([]);
    const listRef = useRef(listContacts); 

    useEffect(() => {
        getUser(props.email) 
    }, [])
    
    useEffect(() => {
        if (user.contacts != undefined) {
            const contacts = user.contacts.map((item, index) => {
                return {
                    'id': index,
                    'name': item.name,
                    'phone': item.phone,
                }
            })
            listRef.current = contacts
            setListContacts(contacts)
        }
    }, [user])

    const getUser = email => {
        api.getUser(email)
        .then(result => {
            setEmail(result.data.getUser.email)
            setUser(result.data.getUser)
        })
        .catch(err => {
            console.log('error get user')
            console.log(err)
    
        });
    }

    const addContact = () => {
        const newId = listContacts.length ? listContacts.slice(-1)[0]['id'] + 1 || 0 : 0
        const newItem = {
            'id': newId, 
            'name': '',
            'phone': '',
        }
        setListContacts(prevArray => [...prevArray, newItem])
        listRef.current = [...listContacts, newItem]
    }

    const updateContact = (id, name, phone) => {
        const index = listRef.current.findIndex(x => x.id == id);
        const item = listRef.current[index];
        const aux = listRef.current;
        item.name = name;
        item.phone = phone;
        aux[index] = item;
        setListContacts(aux);
        listRef.current = aux;
    }

    const removeContact = id => {
        const newList = listRef.current.filter(x => x.id != id);
        setListContacts(newList);
        listRef.current = newList;
    }

    const save = () => {
        const input = {
            email: email,
            contacts: listContacts.map(c => {
                return {
                    name: c.name,
                    phone: c.phone
                }
            })
        }
        api.updateUserContacts(input)
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

                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.text}>contacts</Text>
                        <Icon style={styles.icon} name="phone" size={20} color={colors.darkRed} />
                    </View>
                    
                    {(listContacts.length > 0) ? (
                    <View>
                        <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true}>
                            {listContacts.map(contact => {
                                return (
                                    <Contact
                                        key={contact.id}
                                        id={contact.id}
                                        name={contact.name}
                                        phone={contact.phone}
                                        canRemove={contact.id}
                                        updateContact={updateContact}
                                        removeContact={removeContact}
                                    />
                                )
                            })}
                        </ScrollView>  
                    </View>
                    ) : (
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.smallText}>you don't have any contact added yet</Text>
                        </View>
                    )}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity activeOpacity={0.4}  onPress={() => {
                                addContact()
                            }}>
                            <View style={styles.addContainer}>
                                <Icon style={styles.icon} name="plus" size={15} color={colors.darkRed} />
                                <Text style={styles.smallText}>add contact</Text>
                            </View>
                        </TouchableOpacity>
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

export default ContactScreen;
