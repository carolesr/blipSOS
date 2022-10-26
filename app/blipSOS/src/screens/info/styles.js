
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
    saveContainer: {
        alignSelf: 'center',
        margin: 20,
    }
});

export default styles;
