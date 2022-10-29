
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors'

const styles = StyleSheet.create({
    text: {
        color: colors.darkRed,
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
    },
    smallText: {
        color: colors.darkRed,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5,
    },
    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        // marginTop: 0,
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: colors.white,
    },
    fieldsContainer: {
        flex: 10,

    },
    nameContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    phoneContainer: {
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        alignSelf: 'center',
    },
    inputContainer: {
        flex: 3,
        height: 40,
        elevation: 2,
        backgroundColor: colors.white,
        borderRadius: 5,
        borderBottomWidth: 2,
        borderBottomColor: colors.darkRed,
    },
    input: {
        width: '100%',
        fontWeight: 'bold',        
        color: colors.lightDarkRed
    },
    removeContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
});

export default styles;
