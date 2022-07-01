

// // import React from "react";
// // import Chats from "./chat/Chats";
// // import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Pressable, Dimensions, TextInput,Keyboard,TouchableWithoutFeedback, TouchableOpacity, RefreshControl} from 'react-native';
// // import ChatScreen from "./screens/ChatScreen";

// // const App = () =>{
// //   return(
// // <ChatScreen/>

// //     )
// // }
// // export default App

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserLoginScreen from './app/screen/auth/UserLoginScreen';
import ShopTab from './app/screen/shop/ShopTab';
import RegistrationScreen from './app/screen/auth/RegistrationScreen';
import SendPasswordResetEmailScreen from './app/screen/auth/SendPasswordResetEmailScreen';
import UserPanelTab from './app/screen/UserPanelTab';
import {useNavigation} from '@react-navigation/native';
import {getToken} from 'kura/services/AsyncStorageService';
import {useEffect, useState} from 'react';
import RootNavigator from './navigation/RootNavigator';
import {Provider} from 'react-redux';
import {store} from './app/store';
import FakeApp from './FakeApp';
import ChatScreen from './screens/ChatScreen';
import Chats from './chat/Chats';
import TestScreen from './screens/TestScreen';
import RegisterNavig from './navigation/RegisterNavig';

const Stack = createStackNavigator();

function App() {
  const [usertoken, setUserToken] = useState({});

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        const {access, refresh} = JSON.parse(token);
        setUserToken({
          access: access,
          refresh: refresh,
        });
      } else {
        setUserToken({});
      }
    })();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {usertoken.access ? (
          <>
            <Stack.Screen
              name="FakeApp"
              component={FakeApp}
              options={{title: 'User Login'}}
            />
          </>
        ) : (
          <>
            {/* <Stack.Screen name="Test" component={ChatScreen} options={{ title: 'User Login' }} /> */}

            <Stack.Screen
              name="UserLogin"
              component={UserLoginScreen}
              options={{title: 'User Login'}}
            />
            <Stack.Screen
              name="RegisterNavig"
              component={RegisterNavig}
              options={{title: 'Registration', headerBackVisible: false}}
            />
            <Stack.Screen
              name="SendPasswordResetEmail"
              component={SendPasswordResetEmailScreen}
              options={{title: 'Forgot Password'}}
            />
            <Stack.Screen
              name="UserPanelTab"
              component={UserPanelTab}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="FakeApp"
              component={FakeApp}
              options={{title: 'User Login'}}
            />
            <Stack.Screen name="RootNavigator" component={RootNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
// // import React from 'react'
// // import { LogBox } from "react-native";

// // import { NavigationContainer } from "@react-navigation/native";
// // import { createStackNavigator } from '@react-navigation/stack';
// // import UserLoginScreen from "./app/screen/auth/UserLoginScreen";
// // import ShopTab from "./app/screen/shop/ShopTab";
// // import RegistrationScreen from "./app/screen/auth/RegistrationScreen";
// // import SendPasswordResetEmailScreen from "./app/screen/auth/SendPasswordResetEmailScreen";
// // import UserPanelTab from "./app/screen/UserPanelTab";
// // import FakeApp from './FakeApp';
// // import { Provider } from "react-redux";
// // import { store } from "./app/store";

// // LogBox.ignoreLogs(["EventEmitter.removeListener"]);
// // const Stack = createStackNavigator();

// // function App() {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'purple' }, headerTintColor: 'white' }}>
// //         <Stack.Screen name="ShopTab" component={ShopTab} options={{ headerShown: false }} />
// //         <Stack.Screen name="UserLogin" component={UserLoginScreen} options={{ title: 'User Login' }} />
// //         <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'Registration'}} />
// //         <Stack.Screen name="SendPasswordResetEmail" component={SendPasswordResetEmailScreen} options={{ title: 'Forgot Password' }} />
// //         <Stack.Screen name="UserPanelTab" component={UserPanelTab} options={{ headerShown: false }} />
// //         <Stack.Screen name="FakeApp" component={FakeApp} options={{ headerShown: false }} />

// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }

// // export default () => {
// //   return (
// //     <Provider store={store}>
// //       <App />
// //     </Provider>
// //   )
// // }

// // // import React from "react";
// // // import { NavigationContainer } from '@react-navigation/native';
// // // import { View } from 'react-native';
// // // import Navigator from './navigation/navigator.js'
// // // import { Context, Provider } from "./globalContext/globalContext.js";

// // // function App(props) {

// // //   return(
// // //     <Provider>
// // //       <View style={{flex:1}}>
// // //         <NavigationContainer>
// // //           <Navigator />
// // //         </NavigationContainer>
// // //       </View>
// // //     </Provider>

// // //     )

// // // }

// // // export default App;
// // // import React from 'react';
// // // import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Pressable,} from 'react-native';
// // // import MapView from 'react-native-maps';
// // // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// // // import { NavigationContainer } from '@react-navigation/native';
// // // import MapScreen from "./screens/MapScreen.js";
// // // import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // // import NewsScreen from './screens/NewsScreen.js';
// // // import MyDrawer from './screens/ProfileScreen.js';
// // // import RootNavigator from './navigation/RootNavigator.js';
// // // import NotificationsScreen from './screens/NotificationsScreen.js';
// // // import CategoryScreen from './screens/CategoryScreen.js';
// // // import FontsScreen from './screens/FontsScreen.js';
// // // import ProfileScreen from './screens/ProfileScreen';
// // // import { createStackNavigator } from '@react-navigation/stack';
// // // import DetailScreen from 'kura/screens/DetailScreen.js';
// // // import CameraScreen from './screens/CameraScreen.js';
// // // import FreePost from './screens/FreePost.js';
// // // import  TestScreen  from './screens/TestScreen.js';
// // // import DateScreen from './screens/DateScreen.js';
// // // import GooglePlacesInput from './screens/SearchScreen.js';
// // // import AddPostNavig from './navigation/AddPostNavig.js';
// // // import TitleScreen from './screens/TitleScreen.js';
// // // const Stack = createStackNavigator();
// // // const Tab = createBottomTabNavigator();

// // // function Root() {
// // //   return (
// // //     <Stack.Navigator headerMode='none' initialRouteName='MapScreen'>
// // //       <Stack.Screen name="MapScreen" component={MapScreen} />
// // //       <Stack.Screen name="DetailScreen" component={DetailScreen} />
// // //     </Stack.Navigator>
// // //   );
// // // }

// // // const HomeScreen = ()  =>{
// // //   return (

// // //     <View>

// // //     </View>
// // //   )

// // // }
// // // const SettingsScreen = ()  =>{
// // //   return (

// // //     <View></View>
// // //   )

// // // }
// // // const SettingsScreen1 = ()  =>{
// // //   return (

// // //     <View></View>
// // //   )

// // // }
// // // const SettingsScreen2 = ()  =>{
// // //   return (

// // //     <View></View>
// // //   )

// // // }
// // // function App() {
// // //   return (
// // //     <NavigationContainer >
// // //         <Tab.Navigator       tabBarOptions={{
// // //         activeTintColor: 'white',
// // //         inactiveTintColor:'white',
// // //         style:{
// // //           backgroundColor:'#191C21',
// // //           borderRadius:30,
// // //           elevation:0,
// // //           position:"absolute",
// // //           height:90,
// // //         },
// // //         showLabel: false,

// // //       }}>
// // //       <Tab.Screen name="Home" component={Root}
// // //            options={{
// // //           tabBarIcon: ({ color, size }) => (
// // //             <MaterialCommunityIcons name="earth" color={color} size={50} />
// // //           )}}/>
// // //       <Tab.Screen name="Settings" component={AddPostNavig}
// // //       options={{
// // //         tabBarIcon: ({ color, size }) => (
// // //           <MaterialCommunityIcons name="camera-outline" color={color} size={48} />
// // //         )}}
// // //       />
// // //             <Tab.Screen name="TitleScreen" component={RootNavigator}
// // //       options={{
// // //         tabBarIcon: ({ color, size }) => (
// // //           <FontAwesome name="newspaper-o" color={color} size={46} />
// // //         )}}
// // //       />
// // //             <Tab.Screen name="ProfileScreen" component={MyDrawer}
// // //       options={{
// // //         tabBarIcon: ({ color, size }) => (
// // //           <FontAwesome name="user-circle-o" color={color} size={46} />
// // //         )}}
// // //       />
// // //     </Tab.Navigator>
// // //     </NavigationContainer>
// // //   );
// // // }
// // // export default App
