import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {styles, toastConfig} from '../../../style';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import AddHeader from '../../../assets/components/AddHeader';
import Input from '../../components/Input';

import {useLoginUserMutation} from '../../../services/userAuthApi';
import {storeToken} from '../../../services/AsyncStorageService';

const UserLoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearTextInput = () => {
    setEmail('');
    setPassword('');
  };

  const [loginUser] = useLoginUserMutation();

  const handleFormSubmit = async () => {
    const formData = {email, password};
    const res = await loginUser(formData);
    if (res.data) {
      // console.log("Response Data", res.data)
      await storeToken(res.data.token); // Store Token in Storage
      clearTextInput();
      navigation.navigate('FakeApp');
    }
    if (res.error) {
      // console.log("Response Error", res.error.data.errors)
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
        ...(res.error.data.errors.email
          ? {text1: res.error.data.errors.email[0]}
          : ''),
        ...(res.error.data.errors.password
          ? {text1: res.error.data.errors.password[0]}
          : ''),
        ...(res.error.data.errors.non_field_errors
          ? {text1: res.error.data.errors.non_field_errors[0]}
          : ''),
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#bceaff', alignItems: 'center'}}>
      <AddHeader />
      <Toast config={toastConfig} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          backgroundColor: '#bceaff',
          alignItems: 'center',
        }}>
        <View style={{alignSelf: 'center', marginBottom: 10}}></View>
        <View style={[styles.inputWithLabel, {marginBottom: 10}]}>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Write Your Email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputWithLabel}>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Write Your Password"
            secureTextEntry={true}
          />
        </View>
        <View style={{width: 200, alignSelf: 'center', margin: 20}}>
          <Button title="Login" onPress={handleFormSubmit} color="#ff844d" />
        </View>
        <View style={{flexDirection: 'row',flex:1,justifyContent:'space-evenly',width:'100%'}}>
          <View>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('SendPasswordResetEmail');
            }}>
            <Text style={{fontWeight: 'bold'}}>Forgot Password?</Text>
          </TouchableWithoutFeedback>
          </View>
          <View>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('RegisterNavig');
            }}>
            <Text style={{fontWeight: 'bold'}}>New User? Registration</Text>
          </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserLoginScreen;
