
import React,{useEffect,useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Pressable,} from 'react-native';
import MapView from 'react-native-maps';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import MapScreen from "./screens/MapScreen.js";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NewsScreen from './screens/NewsScreen.js';
import MyDrawer from './screens/ProfileScreen.js';
import RootNavigator from './navigation/RootNavigator.js';
import NotificationsScreen from './screens/NotificationsScreen.js';
import CategoryScreen from './screens/CategoryScreen.js';
import FontsScreen from './screens/FontsScreen.js';
import ProfileScreen from './screens/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from 'kura/screens/DetailScreen.js';
import CameraScreen from './screens/CameraScreen.js';
import FreePost from './screens/FreePost.js';
import  TestScreen  from './screens/TestScreen.js';
import DateScreen from './screens/DateScreen.js';
import GooglePlacesInput from './screens/SearchScreen.js';
import AddPostNavig from './navigation/AddPostNavig.js';
import TitleScreen from './screens/TitleScreen.js';
import { getToken } from './services/AsyncStorageService'
import { useGetLoggedUserQuery } from './services/userAuthApi'
import { useDispatch } from 'react-redux'
import { setUserInfo } from './features/userSlice'
import { setUserAccessToken } from './features/authSlice'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Root() {
  return (
    <Stack.Navigator headerMode='none' initialRouteName='MapScreen'>
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
}
function FakeApp() {
    const [token, setToken] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
      (async () => {
        const token = await getToken()
        if (token) {
          const { access, refresh } = JSON.parse(token)
          setToken({
            "access": access,
            "refresh": refresh
          })
          dispatch(setUserAccessToken({ access_token: access }))
        }
      })();
    }, [])
    const { data, isSuccess } = useGetLoggedUserQuery(token.access)
    useEffect(() => {
      if (isSuccess) {
        dispatch(setUserInfo({ email: data.email, name: data.name }))
      }
    })
  return (
        <Tab.Navigator       tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor:'white',
        style:{
          backgroundColor:'#191C21',
          borderRadius:30,
          elevation:0,
          position:"absolute",
          height:90,
        },
        showLabel: false,

      }}>
      <Tab.Screen name="Home" component={Root}
           options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="earth" color={color} size={50} />
          )}}/>
      <Tab.Screen name="Settings" component={AddPostNavig} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="camera-outline" color={color} size={48} />
        )}}
      />
            <Tab.Screen name="TitleScreen" component={RootNavigator} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="newspaper-o" color={color} size={46} />
        )}}
      />
            <Tab.Screen name="ProfileScreen" component={MyDrawer} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user-circle-o" color={color} size={46} />
        )}}
      />
    </Tab.Navigator>
  );
}
export default FakeApp