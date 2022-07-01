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
import HapticEffect from 'kura/assets/actions/HapticEffect';
import AddScreen from 'kura/assets/components/AddScreen';
const {height} = Dimensions.get('screen');
const {width} = Dimensions.get('screen');

const CameraScreen = ({navigation}) => {
  const [image_url, setImage_url] = useState(null);

  const renderImage = () => {
    if (image_url) {
      return (
        <Image
          source={{uri: image_url}}
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
      setImage_url(image.path);
    });
  };
  const camera = () => {
    ImagePicker.openCamera({
      width: 375,
      height: 375,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setImage_url(image.path);
    });
  };

  const lol = () => {
    navigation.navigate('SearchScreen', {
      params: {image_url: image_url},
    });
    HapticEffect()
  };
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
          <View style={{marginTop: height * 0.03}}>{renderImage()}</View>

          <View style={styles.btnParentSection}>
            <TouchableOpacity onPress={camera} style={styles.btnSection}>
              <Text style={styles.btnText}>Камера</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={gallery} style={styles.btnSection}>
              <Text style={styles.btnText}>Галерея</Text>
            </TouchableOpacity>
          </View>
        </View>
        {image_url ? <NextButton onPress={lol} /> : null}
      </ScrollView>
    </View>
  );
};

export default CameraScreen;
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
