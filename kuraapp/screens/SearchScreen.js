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

const GooglePlacesInput = ({navigation}) => {
  const route = useRoute();
  const [arrow, setArrow] = useState(false);
  const [place, setPlace] = useState('');
  const [long, setlong] = useState();
  const [lati, setLati] = useState();

  const lol = () => {
    navigation.navigate('TitleScreen', {
      i: {image_url: route.params.params.image_url},

      w: {place: place},
      long: {long: long},
      lati: {lati: lati},
    });
    console.log(route.params.params.image_url);
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
        <GooglePlacesAutocomplete
          placeholder="Поиск"
          fetchDetails={true}
          onPress={(data, details = null) => {
            setPlace(data.description);
            setlong(details.geometry.location.lng);
            setLati(details.geometry.location.lat);
            setArrow(isArrow => !isArrow);
            console.log(details.geometry.location.lat);
          }}
          query={{
            key: 'AIzaSyBZbJxoR059J1lLPazhXVrNbfaKEafNDNc',
            language: 'ru',
          }}
          styles={{
            textInputContainer: {
              marginTop: 30,
              width: width * 0.9,
            },
            textInput: {
              height: 48,
              fontSize: 16,
              width: width * 0.9,
            },
            predefinedPlacesDescription: {
              color: '#fff',
              height: 10,
            },
            poweredContainer: {
              display: 'none',
            },
            listView: {
              zIndex: 300,
              borderRadius: 5,
            },
            separator: {},
            container: {
              width: width * 0.9,
              zIndex: 1000000,
            },
          }}
        />
        {arrow ? (
          <View style={{marginBottom: height * 0.5}}>
            <AddText text="Идем дальше 🤪" />
          </View>
        ) : (
          <View style={{marginBottom: height * 0.5}}>
            <AddText text="Укажи адрес 🙃" />
          </View>

        )}
      </View>
      {arrow ? <NextButton onPress={lol} /> : null}
    </View>
  );
};

export default GooglePlacesInput;
