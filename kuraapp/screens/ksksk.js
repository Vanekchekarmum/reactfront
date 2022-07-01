import React, {useEffect, useState, useRef} from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  TouchableHighlight,
  Vibration,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HapticEffect from '../assets/actions/HapticEffect';
import BottomSheet from '@gorhom/bottom-sheet';

import Animated from 'react-native-reanimated';

const {width} = Dimensions.get('screen');
const data1 = [
  {
    id: '1',
    title: 'Manarola, Italy',
    description: 'The Cliffs of Cinque Terre',
    image_url:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80',
    iconName: 'location-pin',
    long: 60.625294978325336,
    lati: 56.8631396484375,
  },
  {
    id: '2',
    title: 'Venezia, Italy',
    description: 'Rialto Bridge, Venezia, Italy',
    image_url:
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=630&q=80',
    iconName: 'location-pin',
    long: 60.625294978315336,
    lati: 56.8431396484375,
  },
  {
    id: '3',
    title: 'Prague, Czechia',
    description: 'Tram in Prague',
    image_url:
      'https://images.unsplash.com/photo-1513805959324-96eb66ca8713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    iconName: 'location-pin',
    long: 60.62529397832836,
    lati: 56.8531396584275,
  },
];
const MapScreen = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [liked, setLiked] = useState(false);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        'http://172.22.13.230:8000/api/user/posts/?format=json',
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const star = () => {
    setLiked(isLiked => !isLiked), Vibration.vibrate();
  };
  const handleLocationPermission = async () => {
    let permissionCheck = '';
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('Location perrmission denied.');
      }
    }

    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('Location perrmission denied.');
      }
    }
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  const cord = () => {
    console.log(location.latitude, location.longitude);
  };
  const sheetRef = React.useRef(null);

  const snapPoints = ['1%', '50%', '90%'];
  const Bottom = ({item}) => {

        return(
          <BottomSheet
          ref={sheetRef}
          initialSnapIndex={1}
          snapPoints={snapPoints}
          backgroundStyle={{backgroundColor: 'white'}}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{item.id}</Text>
        </BottomSheet>
        )
    
  };


  // variables

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {location && (
        <MapView
          style={styles.map}
          mapType={liked ? 'hybridFlyover' : 'standard'}
          initialRegion={{
            latitude: 56.8531396584275,
            longitude: 60.62529397832836,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}>
          {data.map(item => (
            <Marker
              coordinate={{
                latitude: item.lati,
                longitude: item.long,
              }}
              key={item.id}
              onPress={Bottom(item)}>
              <Image
                source={{uri: item.user_img}}
                style={{
                  borderRadius: 50,
                  width: 50,
                  height: 50,
                  borderWidth: 3,
                  borderColor: 'white',
                }}
              />
                {/* <BottomSheet
                  ref={sheetRef}
                  initialSnapIndex={1}
                  snapPoints={snapPoints}
                  backgroundStyle={{backgroundColor: 'white'}}
                  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text></Text>
                </BottomSheet> */}
            </Marker>

          ))}
        </MapView>
      )}

      <Pressable
        style={{
          position: 'absolute',
          width: 49,
          height: 49,
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 770,
          right: 20,
        }}
        onPress={star}>
        <MaterialCommunityIcons
          color={liked ? '#ff844d' : 'black'}
          name="google-earth"
          size={41}
        />
      </Pressable>

        <Bottom/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
