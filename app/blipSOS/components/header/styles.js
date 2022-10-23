
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors'

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
    },
    imageContainer: {
        flex: 1,
        padding: 5,
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
    },
    iconContainer: {
        alignSelf: 'center',
    },
});

export default styles;