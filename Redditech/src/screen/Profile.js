import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {getAccessToken} from "./Login";
import BottomTabNavigator from "./Navigateur";

export const Profile = ({navigation}) => {
    const [userData, setUserData] = useState(null);



    useEffect(() => {
        const getUserData = async () => {
            const accessToken = await getAccessToken();
            try {
                const response = await axios.get('https://oauth.reddit.com/api/v1/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'User-Agent': 'australopitech/1.0.0 (by /u/AdventurousWeather25)',
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, []);

    if (!userData) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Image source={{uri: userData.icon_img}} style={styles.image}/>
            <Text style={styles.username}>{userData.name}</Text>
            <Text style={styles.bio}>{userData.subreddit.display_name_prefixed}</Text>
            <Text style={styles.info}>
                Karma: {userData.link_karma + userData.comment_karma}
            </Text>
            <Text style={styles.info}>
                Joined: {new Date(userData.created_utc * 1000).toLocaleDateString()}
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bio: {
        fontSize: 18,
        color: '#888888',
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
    },
});

