import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import NextButton from '../assets/components/NextButton';
import AddHeader from '../assets/components/AddHeader';
import HapticEffect from '../assets/actions/HapticEffect';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('window');
const TitleScreen = ({navigation}) => {
  const route = useRoute();
  const [text, setText] = React.useState('');
  const [text1, setText1] = React.useState('');

  const lol = () => {
    navigation.navigate('ChooseCategory', {
      i: {image_url: route.params.i.image_url},
      w: {place: route.params.w.place},
      long: {long: route.params.long.long},
      lati: {lati: route.params.lati.lati},
      text: {text: text},
      text1: {text1: text1},
    });
    HapticEffect()
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex: 1, backgroundColor: '#bceaff', alignItems: 'center'}}>
        <AddHeader />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            backgroundColor: '#bceaff',
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            maxLength={50}
            placeholder="Напиши заголовок 🥰"
          />
          <TextInput
            style={styles.input2}
            onChangeText={setText1}
            value={text1}
            multiline
            placeholder="И описание, если хочешь 🤓"
          />
          {text ? <NextButton onPress={lol} /> : null}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default TitleScreen;
const styles = StyleSheet.create({

  input: {
    backgroundColor: 'white',
    marginTop: 30,
    width: width * 0.9,
    height: 68,
    fontSize: 16,
    borderRadius: 4,
    textAlign: 'center',
  },
  input2: {
    backgroundColor: 'white',
    marginTop: 20,
    width: width * 0.9,
    height: height * 0.4,
    fontSize: 16,
    borderRadius: 4,
    textAlign: 'center',
  },
});
