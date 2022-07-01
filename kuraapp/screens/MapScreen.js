import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import HapticEffect from '../assets/actions/HapticEffect';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useTheme} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const Images = [
  {image: require('kura/assets/imgs/64-1.png')},
  {image: require('kura/assets/imgs/64-1.png')},
  {image: require('kura/assets/imgs/64-1.png')},
  {image: require('kura/assets/imgs/64-1.png')},
];

export const markers = [
  {
    coordinate: {
      latitude: 22.6293867,
      longitude: 88.4354486,
    },
    title: 'Amazing Food Place',
    description: 'This is the best food place',
    image: Images[0].image,
    rating: 4,
    reviews: 99,
  },
  {
    coordinate: {
      latitude: 22.6345648,
      longitude: 88.4377279,
    },
    title: 'Second Amazing Food Place',
    description: 'This is the second best food place',
    image: Images[1].image,
    rating: 5,
    reviews: 102,
  },
  {
    coordinate: {
      latitude: 22.6281662,
      longitude: 88.4410113,
    },
    title: 'Third Amazing Food Place',
    description: 'This is the third best food place',
    image: Images[2].image,
    rating: 3,
    reviews: 220,
  },
  {
    coordinate: {
      latitude: 22.6341137,
      longitude: 88.4497463,
    },
    title: 'Fourth Amazing Food Place',
    description: 'This is the fourth best food place',
    image: Images[3].image,
    rating: 4,
    reviews: 48,
  },
  {
    coordinate: {
      latitude: 22.6292757,
      longitude: 88.444781,
    },
    title: 'Fifth Amazing Food Place',
    description: 'This is the fifth best food place',
    image: Images[3].image,
    rating: 4,
    reviews: 178,
  },
];

const MapScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
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

  const getMovies = async () => {
    try {
      const response = await fetch(
        'http://192.168.254.45:8000/api/user/posts/?format=json',
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

  const initialMapState = {
    markers,
    categories: [
      {
        name: 'Fastfood Center',
        icon: (
          <MaterialCommunityIcons
            style={styles.chipsIcon}
            name="food-fork-drink"
            size={18}
          />
        ),
      },

      {
        name: 'Snacks Corner',
        icon: (
          <MaterialCommunityIcons
            name="food"
            style={styles.chipsIcon}
            size={18}
          />
        ),
      },
    ],
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout();
    });
  });

  const interpolations = data.map((item, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
    HapticEffect()
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={{
          latitude: 56.8531396584275,
          longitude: 60.62529397832811,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        style={styles.container}>
        {data.map((item, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: item.lati,
                longitude: item.long,
              }}
              onPress={e => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={{uri: item.user_img}}
                  style={[styles.marker1, scaleStyle ]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>

      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        
        style={styles.chipsScrollView}
        contentInset={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0,
        }}></ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        bounces={false}
        pagingEnabled
        decelerationRate={0}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              width: CARD_WIDTH,
              height: width*0.25,
              backgroundColor: 'white',
              elevation:2,
              borderRadius:30,
              marginHorizontal: 10,
              alignItems:'center',
              justifyContent:'center'
            }}>
            <Image
              style={{backgroundColor: '#000', width:70,height:70, borderRadius:35, position:'absolute', top:17.5, left:10}}
              source={{uri: item.user_img}}
            />
            <Text numberOfLines={3} style={{textAlign:'center', fontSize:18, fontWeight:'700', width:160}}>{item.title}</Text>
            <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate('DetailScreen', {item})}>
            <FontAwesome name="arrow-right" color={'white'} size={30} />

            </TouchableOpacity>

          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom:100,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  arrow: {
    position: 'absolute',
    backgroundColor: '#ff844d',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    top:25,
    right:10
  },
  marker: {
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  marker1: {
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
// import React, {useEffect, useState, useRef} from 'react';
// import {
//   Pressable,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Image,
//   View,
//   Dimensions,
//   Text,
//   TouchableHighlight,
//   Vibration,
// } from 'react-native';
// import MapView, {Marker, Callout} from 'react-native-maps';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import Geolocation from 'react-native-geolocation-service';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import HapticEffect from '../assets/actions/HapticEffect';
// import BottomSheet from '@gorhom/bottom-sheet';

// import Animated from 'react-native-reanimated';

// const {width} = Dimensions.get('screen');
// const data1 = [
//   {
//     id: '1',
//     title: 'Manarola, Italy',
//     description: 'The Cliffs of Cinque Terre',
//     image_url:
//       'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80',
//     iconName: 'location-pin',
//     long: 60.625294978325336,
//     lati: 56.8631396484375,
//   },
//   {
//     id: '2',
//     title: 'Venezia, Italy',
//     description: 'Rialto Bridge, Venezia, Italy',
//     image_url:
//       'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=630&q=80',
//     iconName: 'location-pin',
//     long: 60.625294978315336,
//     lati: 56.8431396484375,
//   },
//   {
//     id: '3',
//     title: 'Prague, Czechia',
//     description: 'Tram in Prague',
//     image_url:
//       'https://images.unsplash.com/photo-1513805959324-96eb66ca8713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
//     iconName: 'location-pin',
//     long: 60.62529397832836,
//     lati: 56.8531396584275,
//   },
// ];
// const MapScreen = ({navigation}) => {
//   const [location, setLocation] = useState(null);
//   const [liked, setLiked] = useState(false);
//   const [data, setData] = useState([]);

//   const getMovies = async () => {
//     try {
//       const response = await fetch(
//         'http://172.22.13.230:8000/api/user/posts/?format=json',
//       );
//       const json = await response.json();
//       setData(json);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getMovies();
//   }, []);

//   const star = () => {
//     setLiked(isLiked => !isLiked), Vibration.vibrate();
//   };
//   const handleLocationPermission = async () => {
//     let permissionCheck = '';
//     if (Platform.OS === 'ios') {
//       permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

//       if (permissionCheck === RESULTS.DENIED) {
//         const permissionRequest = await request(
//           PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//         );
//         permissionRequest === RESULTS.GRANTED
//           ? console.warn('Location permission granted.')
//           : console.warn('Location perrmission denied.');
//       }
//     }

//     if (Platform.OS === 'android') {
//       permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

//       if (permissionCheck === RESULTS.DENIED) {
//         const permissionRequest = await request(
//           PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//         );
//         permissionRequest === RESULTS.GRANTED
//           ? console.warn('Location permission granted.')
//           : console.warn('Location perrmission denied.');
//       }
//     }
//   };

//   useEffect(() => {
//     handleLocationPermission();
//   }, []);

//   useEffect(() => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setLocation({latitude, longitude});
//       },
//       error => {
//         console.log(error.code, error.message);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   }, []);
//   const cord = () => {
//     console.log(location.latitude, location.longitude);
//   };
//   const sheetRef = React.useRef(null);

//   const snapPoints = ['1%', '50%', '90%'];
//   const Bottom = ({item}) => {

//         return(
//           <BottomSheet
//           ref={sheetRef}
//           initialSnapIndex={1}
//           snapPoints={snapPoints}
//           backgroundStyle={{backgroundColor: 'white'}}
//           style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <Text>{item.id}</Text>
//         </BottomSheet>
//         )

//   };

//   // variables

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       {location && (
//         <MapView
//           style={styles.map}
//           mapType={liked ? 'hybridFlyover' : 'standard'}
//           initialRegion={{
//             latitude: 56.8531396584275,
//             longitude: 60.62529397832836,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           showsUserLocation={true}>
//           {data.map(item => (
//             <Marker
//               coordinate={{
//                 latitude: item.lati,
//                 longitude: item.long,
//               }}
//               key={item.id}
//               onPress={Bottom(item)}>
//               <Image
//                 source={{uri: item.user_img}}
//                 style={{
//                   borderRadius: 50,
//                   width: 50,
//                   height: 50,
//                   borderWidth: 3,
//                   borderColor: 'white',
//                 }}
//               />
//                 {/* <BottomSheet
//                   ref={sheetRef}
//                   initialSnapIndex={1}
//                   snapPoints={snapPoints}
//                   backgroundStyle={{backgroundColor: 'white'}}
//                   style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//                   <Text></Text>
//                 </BottomSheet> */}
//             </Marker>

//           ))}
//         </MapView>
//       )}

//       <Pressable
//         style={{
//           position: 'absolute',
//           width: 49,
//           height: 49,
//           justifyContent: 'center',
//           alignItems: 'center',
//           bottom: 770,
//           right: 20,
//         }}
//         onPress={star}>
//         <MaterialCommunityIcons
//           color={liked ? '#ff844d' : 'black'}
//           name="google-earth"
//           size={41}
//         />
//       </Pressable>

//         <Bottom/>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default MapScreen;
