import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from './src/screen/Home';
import Login from './src/screen/Login';
import {Profile} from "./src/screen/Profile";
import Subreddits from "./src/screen/MySubreddits";
import SubredditDetailsScreen from "./src/screen/SubreddtiDetailsScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="My Subreddits" component={Subreddits} options={{headerShown: false}}/>
        <Stack.Screen name="SubredditDetailsScreen" component={SubredditDetailsScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height:"100%",
    width:"100%",
    backgroundColor:'white',
  }
})