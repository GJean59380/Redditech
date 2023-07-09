import React from 'react';
import Login from "./Login";
import Home from "./Home"
import {Profile} from "./Profile";
import Subreddits from "./MySubreddits";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';


const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator tabBarOptions={{
            style: styles.tabBar,
            labelStyle: styles.tabBarLabel,
            iconStyle: styles.tabBarIcon,
        }}>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Login" component={Login}/>
            <Tab.Screen name="Profile" component={Profile}/>
            <Tab.Screen name="My Subreddits" component={Subreddits}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    tabBarLabel: {
        fontSize: 12,
        marginBottom: 5,
    },
    tabBarIcon: {
        width: 20,
        height: 20,
    },
});


export default BottomTabNavigator;
