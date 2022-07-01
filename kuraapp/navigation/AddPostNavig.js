import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from "kura/screens/SearchScreen.js"
import DateScreen from 'kura/screens/DateScreen';
import CameraScreen from 'kura/screens/CameraScreen';
import TitleScreen from 'kura/screens/TitleScreen';
import FreePost from 'kura/screens/FreePost';
import TestScreen from '../screens/TestScreen';
import ChatScreen from '../screens/ChatScreen';
import ChooseCategory from '../screens/ChooseCategory';
import FinalScreen from '../screens/FinalScreen';
const Stack = createStackNavigator();

const AddPostNavig = () =>  {
    return (
      <Stack.Navigator headerMode='none'>
                        {/* <Stack.Screen name="ChooseCategory" component={ChooseCategory} />

                <Stack.Screen name="DateScreen" component={DateScreen} />

        <Stack.Screen name="Test" component={ChatScreen} /> */}

        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />


        <Stack.Screen name="TitleScreen" component={TitleScreen} />
        <Stack.Screen name="ChooseCategory" component={ChooseCategory} /> 
        <Stack.Screen name="DateScreen" component={DateScreen} />

        <Stack.Screen name="FinalScreen" component={FinalScreen} />


      </Stack.Navigator>
    );
  }
export default AddPostNavig
  