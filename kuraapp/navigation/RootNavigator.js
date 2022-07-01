import * as React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import NewsScreen from '../screens/NewsScreen';
import DetailScreen from '../screens/DetailScreen';
import MapScreen from '../screens/MapScreen';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryScreen from '../screens/CategoryScreen';
import ChatScreen from '../screens/ChatScreen';
import AnotherProfile from '../screens/AnotherProfile';
const Stack = createSharedElementStackNavigator();
const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};
const Stack1 = createStackNavigator();

const LentaNavig = () => {
  return (
    <Stack1.Navigator headerMode="none">
      <Stack1.Screen name="NewsScreen" component={NewsScreen} />

      <Stack1.Screen name="CategoryScreen" component={CategoryScreen} />
    </Stack1.Navigator>
  );
};
export default function RootNavigator() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={NewsScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />

      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="AnotherProfile" component={AnotherProfile} options={() => options}/>

      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={() => options}
      />

      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}
