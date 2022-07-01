import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'kura/ascreens/HomeScreen.js';
import LoginScreen from 'kura/ascreens/LoginScreen.js';
import RegisterScreen from 'kura/ascreens/RegisterScreen.js';
import {AuthContext} from 'kura/context/AuthContext.js';
import SplashScreen from 'kura/ascreens/SplashScreen.js';

const Stack = createStackNavigator();

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.token ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;