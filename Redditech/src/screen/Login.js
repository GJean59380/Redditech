import React, {useState} from 'react'
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {encode} from 'base-64';


export const setAccessToken = async (token) => {
    try {
        await AsyncStorage.setItem('accessToken', token);
    } catch (error) {
        console.log(error);
    }
};

export const getAccessToken = async () => {
    try {
        return await AsyncStorage.getItem('accessToken');
    } catch (error) {
        console.log(error);
    }
};


export default function Login({navigation}) {

    const config = {
        clientId: '-fTwqmcq-5IpztuUQl27JQ',
        redirectUri: 'exp://192.168.0.17:19000/home',
        scopes: ['identity', 'edit', 'flair', 'history', 'livemanage', 'modconfig', 'modflair', 'modlog', 'modposts', 'modwiki', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'structuredstyles', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread'],
        duration: 'temporary',
        state: Math.random().toString(36).substring(7),
        serviceConfiguration: {
            authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
            tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
            revocationEndpoint: 'https://www.reddit.com/api/v1/revoke_token',
        },
    };

    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${config.clientId}&response_type=code&state=${config.state}&redirect_uri=${encodeURIComponent(config.redirectUri)}&duration=${config.duration}&scope=${config.scopes}`;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isClicked, setIsClicked] = useState(false)

    const buttonLoginDidTap = () => {
        console.log('Login button did tape')
        setIsClicked(true);
    }

    const backButtonDidTap = () => {
        navigation.goBack();
    }

    const handleLoginPress = async () => {
        const result = await AuthSession.startAsync({
            authUrl: authUrl,
        });
        if (result.type === 'success' && result.params.code) {
            const tokenUrl = 'https://www.reddit.com/api/v1/access_token';
            const response = await fetch(tokenUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${encode(config.clientId + ':' + '6Rj8mrxQQGWCARnw8pkoerw2Wfo3Cw')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=authorization_code&code=${result.params.code}&redirect_uri=${config.redirectUri}`,
            });

            const tokenResponse = await response.json();
            const token = tokenResponse.access_token;
            //console.log(token + " Success")
            await setAccessToken(token);
            navigation.navigate('My Subreddits');
            //console.log(await getAccessToken());

            // localStorage.setItem('token', token);
        }
    };

    return (
        <View style={styles.background}>

            <View style={styles.logoContainer}>
                <TouchableOpacity style={styles.logo} onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.logoImg} source={require('../img/logo.png')}/>
                </TouchableOpacity>
            </View>

            <View style={styles.pageNameContainer}>
                <Text style={styles.pageName}>Page de connexion à Reddit</Text>
            </View>

            <View style={styles.loginForm}>
                <TextInput
                    placeholder={'Mail'}
                    autoCapitalize='none'
                    value={email}
                    onChangeText={setEmail}
                    style={styles.textInput}>
                </TextInput>
                <MessageEmailError style={styles.errorMsg} propsEmail={email} isClicked={isClicked}/>

                <TextInput
                    placeholder={'Mot de passe'}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    style={styles.textInput}>
                </TextInput>
                <MessagePasswordError propsPassword={password} isClicked={isClicked}/>

                <TouchableOpacity style={styles.loginButtonContainer} onPress={buttonLoginDidTap}>
                    <Text style={styles.loginButtonText}>Se Connecter</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.RedditLoginButtonContainer}>
                <TouchableOpacity style={styles.RedditLoginButton} onPress={handleLoginPress}>
                    <Text style={styles.RedditLoginButtonText}><Image style={styles.ImgLogingReddit}
                                                                      source={require('../img/logo_reddit.png')}/> Se
                        connecter avec Reddit</Text>
                </TouchableOpacity>
            </View>


            {/* //???????????????????????????????



                <Button
                    title="Se connecter"
                    onPress={buttonLoginDidTap}
                    style={styles.loginButton}
                />

            <TouchableOpacity style={styles.RedditLoginButton} hitSlop={{ top: 0, bottom: 0, left: 0, right: 0 }}
                    onPress={handleLoginPress}>
                    <Text>Se connecter à Reddit</Text>
                </TouchableOpacity>
                
            <Button
                title="Se connecter"
                color="blue"
                onPress={buttonLoginDidTap}
            />
            <Button
                title="Se connecter"
                color="#FF4500"
                onPress={buttonLoginDidTap}
            />
            //??????????????????????????????? */}


        </View>
    )
}

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
    pageNameContainer: {
        marginTop: 25,
        paddingBottom: 25,
        marginHorizontal: 25,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
    },
    pageName: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
    },
    loginForm: {
        marginVertical: 60,
        paddingBottom: 30,
        marginHorizontal: 50,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        borderStyle: 'dashed',
    },
    textInput: {
        paddingLeft: 5,
        backgroundColor: 'white',
        height: 30,
        marginVertical: 5,
        borderRadius: 10,

    },
    loginButtonContainer: {
        marginHorizontal: 40,
        height: 40,
        marginVertical: 15,
        backgroundColor: '#89FF20',
        borderRadius: 100,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 7,
        color: 'white',

    },
    RedditLoginButtonContainer: {
        alignItems: 'center',
    },
    RedditLoginButton: {},
    RedditLoginButtonText: {
        paddingTop: 1,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#ff4500',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        height: 50,
        textAlign: 'center',
        fontSize: 16,
    },
    ImgLogingReddit: {
        width: 30,
        height: 30,
    },

})

const MessageEmailError = ({propsEmail, isClicked}) => {

    const Emailvalidate = () => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!propsEmail.match(emailRegex) && isClicked)
            return (true);
        return (false);
    }

    if (Emailvalidate())
        return (
            <View style={{
                width: "60%",
                justifyContent: "center",
                alignContent: "center",
            }}>
                <Text style={{
                    color: "red",
                    textAlign: "center",
                    fontSize: 12
                }}>
                    Le format de l'email entré n'est pas bon
                </Text>
            </View>
        )
    return (<></>)
}


const MessagePasswordError = ({propsPassword, isClicked}) => {

    function passwordValidate() {
        const passwordRegex = `^.{6,}$`;

        if (!propsPassword.match(passwordRegex) && isClicked)
            return (true);
        return (false);
    }

    if (passwordValidate())
        return (
            <View style={{
                width: "60%",
                justifyContent: "center",
                alignContent: "center",
            }}>
                <Text style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 12
                }}>
                    6 characters minimum
                </Text>
            </View>
        )
    return (<></>)
}