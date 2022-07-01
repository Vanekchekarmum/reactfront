import React, {useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {View, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import NextButton from '../assets/components/NextButton';
import AddHeader from '../assets/components/AddHeader';
import AddText from '../assets/components/AddText';
import HapticEffect from '../assets/actions/HapticEffect';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('window');

const FinalScreen = ({navigation}) => {
  const route = useRoute();
  const [arrow, setArrow] = useState(false);
  const [place, setPlace] = useState('');
  const [long, setlong] = useState();
  const [lati, setLati] = useState();

  const lol = () => {
    navigation.navigate('CameraScreen');
    HapticEffect()
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#bceaff',
        alignItems: 'center',
      }}>
      <AddHeader />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#bceaff',
          alignItems: 'center',
          flexDirection: 'column',
        }}>


          <View style={{marginBottom: height * 0.5}}>
            <AddText text="Пост опубликован" />
          </View>

        
      </View>
      {/* <NextButton onPress={lol} /> */}
    </View>
  );
};

export default FinalScreen;
