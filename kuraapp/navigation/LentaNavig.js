import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewsScreen from 'kura/navigation/LentaNavig.js';
import CategoryScreen from '../screens/CategoryScreen';
import AnotherProfile from '../screens/AnotherProfile';
const Stack = createStackNavigator();

const LentaNavig = () =>  {
    return (
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="NewsScreen" component={NewsScreen} />
        <Stack.Screen name="AnotherProfile" component={AnotherProfile} />

        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />

      </Stack.Navigator>
    );
  }
export default LentaNavig
  