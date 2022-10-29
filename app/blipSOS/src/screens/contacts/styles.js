
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
    infoContainer: {
        maxHeight: '75%',
        
    },
    titleContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 20
    },
    icon: {
        paddingTop: 3,
        paddingLeft: 15,
        paddingRight: 10,
        // alignSelf: 'center'
    },
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
    addContainer: {
        flexDirection: 'row',
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        alignSelf: 'center',
    },
    saveContainer: {
        // flex: 1,
        // marginBottom: 20,
        // borderWidth: 2,
        // borderColor: 'red'
    }
});

export default styles;
