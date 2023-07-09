import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';

const SubredditDetailsScreen = () => {
    const {params} = useRoute();
    const subreddit = params?.subreddit;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`https://www.reddit.com/r/${subreddit.display_name}/hot.json`)
            .then(response => response.json())
            .then(data => {
                setPosts(data.data.children.map(child => child.data));
            })
            .catch(error => {
                console.error(error);
            });
    }, [subreddit]);

    const renderItem = ({item}) => (
        <TouchableOpacity style={styles.postContainer} onPress={() => {/* Handle press on post */
        }}>
            <View style={styles.postHeader}>
                <Image style={styles.thumbnail} source={{uri: item.thumbnail}}/>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.postFooter}>
                <Text style={styles.author}>Posted by {item.author}</Text>
                <Text style={styles.comments}>{item.num_comments} comments</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{subreddit?.display_name_prefixed}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Title:</Text>
                <Text>{subreddit?.title}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Public Description:</Text>
                <Text>{subreddit?.public_description}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Subscribers:</Text>
                <Text>{subreddit?.subscribers}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Online:</Text>
                <Text>{subreddit?.accounts_active}</Text>
            </View>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
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
    list: {
        flex: 1,
        width: '100%',
    },
    postContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    thumbnail: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    author: {
        fontSize: 14,
        color: '#888',
    },
    comments: {
        fontSize: 14,
        color: '#888',
    },
});
export default SubredditDetailsScreen;