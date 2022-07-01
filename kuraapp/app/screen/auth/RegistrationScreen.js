import {Image, View, Text, Button, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, StyleSheet,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { styles, toastConfig } from '../../../style';
import Toast from 'react-native-toast-message';
import CheckBox from '@react-native-community/checkbox';
import { storeToken } from '../../../services/AsyncStorageService';
import ImagePicker from 'react-native-image-crop-picker';


import { useRegisterUserMutation } from '../../../services/userAuthApi';
const {height} = Dimensions.get('screen');
const {width} = Dimensions.get('screen');
const RegistrationScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [tc, setTc] = useState(null);
  const [image, setImage] = useState(null);

  const renderImage = () => {
    if (image) {
      return (
        <Image
          source={{uri: image}}
          style={{
            backgroundColor: 'black',
            width: 375,
            height: 375,
            borderRadius: 10,
          }}
        />
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: 'white',
            width: 375,
            height: 375,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 30, textAlign: 'center', color: 'grey'}}>
            Выбери заставку🥰
          </Text>
        </View>
      );
    }
  };
  const gallery = () => {
    ImagePicker.openPicker({
      width: 375,
      height: 375,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setImage(image.path);
    });
  };
  const camera = () => {
    ImagePicker.openCamera({
      width: 375,
      height: 375,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setImage(image.path);
    });
  };


  const clearTextInput = () => {
    setName('')
    setEmail('')
    setPassword('')
    setPassword2('')
    setTc(null)
  }
  const navigation = useNavigation()

  const [registerUser] = useRegisterUserMutation()

  const handleFormSubmit = async () => {
    PicturePath = image

    var formData = new FormData();
    formData.append('image', {
      uri: PicturePath,
      name: 'kkkkk.jpg',
      type: 'image/jpg',
    });
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password2', password2);
    formData.append('tc', tc);


    const res = await registerUser(formData)
    console.log(formData)

    // console.log("Response", res)
    if (res.data) {
      // console.log("Response Data", res.data)
      await storeToken(res.data.token)  // Store Token in Storage
      clearTextInput()
      navigation.navigate('FakeApp')
    }
    if (res.error) {
      // console.log("Response Error", res.error.data.errors)
      Toast.show({
        type: 'warning',
        position: 'bottom',
        topOffset: 10,
        height:200,
        ...(res.error.data.errors.name ? { text1: res.error.data.errors.name[0] } : ''),
        ...(res.error.data.errors.email ? { text1: res.error.data.errors.email[0] } : ''),
        ...(res.error.data.errors.password ? { text1: res.error.data.errors.password[0] } : ''),
        ...(res.error.data.errors.password2 ? { text1: res.error.data.errors.password2[0] } : ''),
        ...(res.error.data.errors.tc ? { text1: res.error.data.errors.tc[0] } : ''),
        ...(res.error.data.errors.non_field_errors ? { text1: res.error.data.errors.non_field_errors[0] } : '')
      })
    }
  }
  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={{ marginHorizontal: 30 }}>
        <View style={{marginTop: height * 0.03}}>{renderImage()}</View>
        <View style={styless.btnParentSection}>
            <TouchableOpacity onPress={camera} style={styless.btnSection}>
              <Text style={styless.btnText}>Камера</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={gallery} style={styless.btnSection}>
              <Text style={styless.btnText}>Галерея</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputWithLabel}>
            <Text style={styles.labelText}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Write Your Name" />
          </View>
          <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Write Your Email" keyboardType='email-address' />
          </View>
          <View style={styles.inputWithLabel}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Write Your Password" secureTextEntry={true} />
          </View>
          <View style={styles.inputWithLabel}>
            <Text style={styles.labelText}>Confirm Password</Text>
            <TextInput style={styles.input} value={password2} onChangeText={setPassword2} placeholder="Write Your Confirm Password" secureTextEntry={true} />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <CheckBox value={tc} onValueChange={setTc} color={tc ? '#4630EB' : undefined} />
            <Text style={styles.labelText}>I agree to term and condition.</Text>
          </View>
          <View style={{ width: 200, alignSelf: 'center', margin: 20 }}>
            <Button title='Join' onPress={handleFormSubmit} color='purple' />
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableWithoutFeedback onPress={() => { navigation.navigate('UserLogin') }}>
              <Text style={{ fontWeight: 'bold' }}>Already Registered ? Login</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ alignSelf: 'center', marginBottom: 10 }}>
            {/* <MaterialIcon name='shopping-bag' color='purple' size={100} /> */}
          </View>
        </View>
        <View style={{height:300}}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegistrationScreen
const styless = StyleSheet.create({
  scrollView: {
    backgroundColor: 'green',
  },

  body: {
    backgroundColor: '#bceaff',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    width: 450,
    height: 450,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    top: height * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.9,
  },
  btnSection: {
    width: 150,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    marginBottom: 10,
    borderColor: '#000',
    borderWidth: 3,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
