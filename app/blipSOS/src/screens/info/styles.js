
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors'

const styles = StyleSheet.create({
    screen: {
        marginTop: '8%',
        borderRadius: 50,
        backgroundColor: colors.white,
        elevation: 20,
    },
    container: {
        justifyContent: 'space-between',
        margin: 35,
        height: '100%',
    },
    titleContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 30
    },
    icon: {
        paddingTop: 3,
        paddingLeft: 15
    },
    text: {
        color: colors.darkRed,
        fontWeight: 'bold',
        fontSize: 20,
    },
    smallText: {
        color: colors.darkRed,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    readOnlyContainer: {
        flex: 2.5,
        justifyContent: 'center',
        height: 40,
        opacity: 0.3
    },
    readOnlyDeviceIdContainer: {
        flex: 2,
        justifyContent: 'center',
        height: 40,
        opacity: 0.3
    },
    readOnlyText: {
        color: colors.darkRed,
        fontWeight: 'bold',
        fontSize: 14,
    },
    textContainer: {
        flex: 1,
        alignSelf: 'center',
    },
    inputContainer: {
        flex: 2.5,
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
    editButtonContainer: {
        flex: 0.5,
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 1,
        backgroundColor: colors.white
    },
    editButtonText: {
        color: colors.lightDarkRed,
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
    },
    saveContainer: {
        alignSelf: 'center',
        margin: 20,
    },
    modalContainer: {
        justifyContent: 'space-between',
        alignItems: "center",
        alignSelf: 'center',
        marginTop: '70%',
        width: '80%',
        height: 250,
        padding: 20,
        elevation: 20,
        borderRadius: 10,
        backgroundColor: colors.white,
    },
    modalHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    modalHeaderText: {
        flex: 5,
        alignItems: 'center',
        paddingLeft: 15,
    },
    modalIcon: {
        paddingTop: 3,
    },
    modalContentContainer: {
        justifyContent: 'space-between',
        margin: 10,
        marginTop: 30,

    },
    modalTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    modalInputContainer: {
        marginTop: 10,
        height: 40,
        elevation: 3,
        backgroundColor: colors.white,
        borderRadius: 5,
        borderBottomWidth: 2,
        borderBottomColor: colors.darkRed,
    },
    modalFooterContainer: {
        alignSelf: 'center',
        margin: 10,
        marginTop: 20,
    },
});

export default styles;
