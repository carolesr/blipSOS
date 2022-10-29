
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors'

const styles = StyleSheet.create({
    sosContainer: {
        margin: 10,
        marginBottom: 15,
        padding: 15,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: colors.white,
    },
    mapContainer: {
        flex: 2,
        minHeight: 150,

    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    textContainer: {
        paddingBottom: 10,
        alignSelf: 'center',
    },
    text: {
        color: colors.darkRed,
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default styles;
