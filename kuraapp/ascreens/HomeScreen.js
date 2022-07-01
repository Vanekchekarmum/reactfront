
import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from 'kura/context/AuthContext.js';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
function handleRequest() {
  axios
  .get('http://127.0.0.1:8000/api/auth/logout/')
  .then(response => {
      const { token, user } = response.data;

      // We set the returned token as the default authorization header
      axios.defaults.headers.common.Authorization = `Token ${token}`;
      
      // Navigate to the home screen
    })
    .catch(error => console.log(error));
}


const HomeScreen = () => {
  const {userInfo, isLoading, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome { `Token ${userInfo.token}`}</Text>
      <Button title="Logout" color="red" onPress={handleRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;