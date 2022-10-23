
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors'

const styles = StyleSheet.create({
    screen: {
        marginTop: '8%',
        padding:20,
        borderRadius: 50,
        backgroundColor: colors.white,
        borderColor: 'blue',
        // borderWidth: 2,
        shadowColor: "#000",
        shadowOpacity: 1,
        // shadowRadius: 20,
        shadowOffset: {
          height: 100,
          width: 0
        }
    },
    container: {
        // flexDirection: 'co',
        justifyContent: 'space-between',
        margin: '7%',
        height: '100%',
        borderColor: 'green',
        borderWidth: 2,
    },
});

export default styles;
