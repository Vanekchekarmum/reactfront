import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from './DashboardScreen';
import SideBar from './SideBar';
import ChangePasswordScreen from './auth/ChangePasswordScreen';
import { createStackNavigator } from '@react-navigation/stack';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const UserPanelTab = () => {
  return (
    <Drawer.Navigator drawerContent={props => <SideBar {...props} />} screenOptions={{ headerStyle: { backgroundColor: 'purple' }, headerTintColor: 'red' }}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerTitle: 'Change Password' }} />
    </Drawer.Navigator>
  //   <Stack.Navigator >
  //   <Stack.Screen name="Dashboard" component={DashboardScreen} />
  //   <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}  />
  // </Stack.Navigator>
  )
}

export default UserPanelTab