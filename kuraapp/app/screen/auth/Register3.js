import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AddHeader from 'kura/assets/components/AddHeader';
import NextButton from 'kura/assets/components/NextButton';
import { storeToken } from '../../../services/AsyncStorageService';

import Toast from 'react-native-toast-message';

import { useRegisterUserMutation } from '../../../services/userAuthApi';
import HapticEffect from 'kura/assets/actions/HapticEffect';
import {useRoute} from '@react-navigation/native';

import AddScreen from 'kura/assets/components/AddScreen';
const {height} = Dimensions.get('screen');
const {width} = Dimensions.get('screen');

const Register3 = ({navigation}) => {
  const [image_url, setImage_url] = useState(null);
  const route = useRoute();

  const renderImage = () => {
    if (image_url) {
      return (
        <Image
          source={{uri: image_url}}
          style={{
            backgroundColor: 'black',
            width: 300,
            height: 300,
            borderRadius: 150,
          }}
        />
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: 'white',
            width: 300,
            height: 300,
            borderRadius: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 30, textAlign: 'center', color: 'grey'}}>
            Выбери фото
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
      cropperCircleOverlay: true,

    }).then(image => {
      console.log(image.path);
      setImage_url(image.path);
    });
  };
  const camera = () => {
    ImagePicker.openCamera({
        cropperCircleOverlay: true,

      width: 375,
      height: 375,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setImage_url(image.path);
    });
  };

  const [registerUser] = useRegisterUserMutation()

  const handleFormSubmit = async () => {
    PicturePath = image_url

    var formData = new FormData();
    formData.append('image', {
      uri: PicturePath,
      name: 'kkkkk.jpg',
      type: 'image/jpg',
    });
    formData.append('name', route.params.name.name);
    formData.append('email', route.params.email.email);
    formData.append('password', route.params.password.password);
    formData.append('password2', route.params.password2.password2);
    formData.append('tc', route.params.tc.tc);


    const res = await registerUser(formData)
    console.log(formData)

    // console.log("Response", res)
    if (res.data) {
      // console.log("Response Data", res.data)
      await storeToken(res.data.token)  // Store Token in Storage
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
    }}
  return (
    <View style={{flex: 1, backgroundColor: '#bceaff'}}>
      <AddHeader />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          backgroundColor: '#bceaff',
          alignItems: 'center',
        }}>
        <View style={styles.body}>
          <View style={{marginTop: height * 0.1, alignItems:'center'}}>{renderImage()}</View>

          <View style={styles.btnParentSection}>
            <TouchableOpacity onPress={camera} style={styles.btnSection}>
              <Text style={styles.btnText}>Камера</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={gallery} style={styles.btnSection}>
              <Text style={styles.btnText}>Галерея</Text>
            </TouchableOpacity>
          </View>
        </View>
        {image_url ? <NextButton onPress={handleFormSubmit} /> : null}
      </ScrollView>
    </View>
  );
};

export default Register3;
const styles = StyleSheet.create({
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
    position: 'absolute',
    top: height * 0.58,
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
