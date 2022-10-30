
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
        paddingBottom: '35%',
        height: '100%',
    },
    titleContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 30
    },
    icon: {
        paddingLeft: 15,
        alignSelf: 'center'
    },
    welcomeContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: colors.darkRed,
        fontWeight: 'bold',
        fontSize: 20,
    },
    mediumText: {
        color: colors.darkRed,
        fontWeight: 'bold',
        fontSize: 16,
        padding: 5,
    },
    smallText: {
        color: colors.darkRed,
        fontWeight: 'bold',
        fontSize: 14,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    button: {
        width: 120,
        backgroundColor: colors.red,
        borderRadius: 5,
        elevation: 5

    },
    buttonText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10

    },
    iconButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5
    },
});

export default styles;
