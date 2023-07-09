import { View, Text, Image, StyleSheet, TouchableOpacity, border } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Home = ({ navigation }) => {
    return (
        <View style={styles.background}>

            <View style={styles.logoContainer} >
                <TouchableOpacity style={styles.logo} onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.logoImg} source={require('../img/logo.png')} />
                </TouchableOpacity>
            </View>

            <View style={styles.MainText} >
                <Text style={styles.title}>Bienvenue sur l'appli <Text style={styles.AppName}>Redditech</Text></Text>
                <Text style={styles.subtitle}>L'application de Reddit pour Epitech</Text>
            </View>

            <View style={styles.ButtonContainer} >
                <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.ButtonText}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    background: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: '#33A2FF'

    },
    logoContainer: {
        alignItems: 'center',
        width: '100%',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        justifyContent: 'center',
    },
    logoImg: {
        width: 100,
        height: 100,
    },
    MainText: {
        alignItems: 'center',
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        
    }, 
    AppName: {
        fontWeight: 'bold',
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 5,
        paddingBottom:10,
        width: '60%',
        color: 'white',
        fontStyle: 'italic',
        borderBottomColor: 'white',
        borderBottomWidth: 2,        
    },
    ButtonContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    Button: {
        width: '70%',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    ButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#33A2FF',
    },
}
);

export default Home;