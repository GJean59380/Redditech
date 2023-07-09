import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {getAccessToken} from './Login';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export const Subreddits = ({navigation}) => {
    const [subreddits, setSubreddits] = useState(null);

    useEffect(() => {
        const fetchSubreddits = async () => {
            const accessToken = await getAccessToken();
            const response = await axios.get('https://oauth.reddit.com/subreddits/mine/subscriber', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'User-Agent': 'australopitech/1.0.0 (by /u/AdventurousWeather25)',
                },
            });
            setSubreddits(response.data.data.children.map((child) => child.data));
        };
        fetchSubreddits();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('SubredditDetailsScreen', { subreddit: item })}
        >
            <Text style={styles.title}>{item.display_name_prefixed}</Text>
            <Text>{item.public_description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Subreddits you subscribe to:</Text>
            <FlatList data={subreddits} renderItem={renderItem} keyExtractor={(item) => item.id}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default Subreddits;
