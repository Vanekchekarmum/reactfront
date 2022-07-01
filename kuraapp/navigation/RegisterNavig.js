import * as React from 'react';
import Register1 from '../app/screen/auth/Register1';
import Register2 from '../app/screen/auth/Register2';
import Register3 from '../app/screen/auth/Register3';

import { createStackNavigator } from '@react-navigation/stack';
const Stack1 = createStackNavigator();

const RegisterNavig = () =>  {
    return (
      <Stack1.Navigator headerMode='none'>
        <Stack1.Screen name="Register1" component={Register1} />
        <Stack1.Screen name="Register2" component={Register2} />
        <Stack1.Screen name="Register3" component={Register3} />

      </Stack1.Navigator>
    );
  }
export default RegisterNavig