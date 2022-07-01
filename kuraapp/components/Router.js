import React from 'react';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import Login from 'kura/ascreens/LoginScreen.js';
import Register from 'kura/ascreens/RegisterScreen.js';
import Home from 'kura/ascreens/HomeScreen.js';


const RouterComponent = () => {
  return (
    <Router>
      <Stack hideNavBar key="root">
        <Stack
          key="auth"
          type="reset"
        >
          <Scene
            title="Sign In"
            key="login"
            component={Login}
            initial
          />
          <Scene
            title="Register"
            key="register"
            component={Register}
          />  
        </Stack>
        <Stack
          key="main"
          type="reset"
        >
          <Scene
            title="Home"
            key="home"
            component={Home}
            initial
          />
        </Stack>
      </Stack>
    </Router>
  );
};


export default RouterComponent;