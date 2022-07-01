import React from 'react'

import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './HomeScreen';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../../services/AsyncStorageService';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FakeApp from '../../../FakeApp';
import UserLoginScreen from '../auth/UserLoginScreen';
import MapScreen from '../../../screens/MapScreen';
import MyDrawer from 'kura/screens/ProfileScreen.js';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ShopTab = () => {
  const navigation = useNavigation()
  const [usertoken, setUserToken] = useState({})

  useEffect(() => {
    (async () => {
      const token = await getToken()
      if (token) {
        const { access, refresh } = JSON.parse(token)
        setUserToken({
          "access": access,
          "refresh": refresh
        })
      } else {
        setUserToken({})
      }
    })();
  }, [])

  const handleUserAuth = () => {
    if (usertoken.access) {
      navigation.navigate('UserPanelTab', { screen: 'Dashboard' })
    } else {
      navigation.navigate('UserLogin')
    }
  }

  return (
  //   <Stack.Navigator headerMode='none' >
  // <Stack.Screen name="FakeApp" component={FakeApp} />
  // <Stack.Screen name="UserLogin" component={UserLoginScreen} /> 
  // <Stack.Screen name="MapScreen" component={MapScreen} /> 
  // <Stack.Screen name="MyDrawer" component={MyDrawer} /> 

  
  // </Stack.Navigator>
    <Drawer.Navigator     drawerStyle={{
      backgroundColor: '#bceaff',

    }} 
    screenOptions={{
      headerShown: true
    }}
      >

      <Drawer.Screen name="Home" component={HomeScreen} options={{
        headerTitle: 'Geek-Shop', drawerActiveTintColor: 'black', headerRight: () => <TouchableWithoutFeedback onPress={handleUserAuth}>

          {usertoken.access ? <Text style={{ color: 'white', fontSize: 18, paddingRight: 20, fontWeight: 'bold' }}>Dashboard</Text> : <Text style={{ color: 'red', fontSize: 18, paddingRight: 20, fontWeight: 'bold' }}>Login</Text>}

        </TouchableWithoutFeedback>
      }} />

    </Drawer.Navigator>
  )
}

export default ShopTab