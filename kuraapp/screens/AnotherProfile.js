import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Dimensions,
  ActionSheetIOS
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import DetailScreen from 'kura/screens/DetailScreen.js';
import {useSelector} from 'react-redux';
import {getToken} from 'kura/services/AsyncStorageService';
import UserLoginScreen from 'kura/app/screen/auth/UserLoginScreen.js';
import {useNavigation} from '@react-navigation/native';

import {useRoute} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import NotificationsScreen from 'kura/screens/NotificationsScreen.js';
const Stack = createStackNavigator();
const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.3;
const ITEM_HEIGHT = ITEM_WIDTH;
imgs = ['kura/assets/imgs/nastya.png'];
const arr = ['business', 'wine', 'art&culture ', 'sport'];
const icons = ['telegram', 'whatsapp', 'google', 'vk'];

const AnotherProfile = ({navigation, route}) => {

  const [data, setData] = useState([]);
  const { item } = route.params;
  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Сохранить ⭐', 'Пожаловаться 🤬'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setResult(Math.floor(Math.random() * 100) + 1);
        } else if (buttonIndex === 2) {
          setResult('🔮');
        }
      },
    );
  const getMovies = async () => {
    try {
      const response = await fetch(
        `http://192.168.254.45:8000/api/user/users/${item.userid}`,
        {
          method: 'GET',
          headers: {
            // authorization: `Bearer ${access}`,
            Accept: 'application/json',
          },
        },
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const myData = useSelector(state => state.user);
  const handleLogout = async () => {
    console.log(data.image);
    // await removeToken();
    // console.log('Logout');
    // navigation.navigate('UserLogin');
  };

  return (
    <View style={{backgroundColor: '#097fb4', flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.oval}>
          {/* <Pressable
            style={{position: 'absolute', bottom: '82%', right: '85%'}}
            onPress={() => navigation.navigate('NotificationsScreen')}>
            <MaterialCommunityIcons
              style={{}}
              name="keyboard-backspace"
              color={'#191C21'}
              size={40}
            />
          </Pressable> */}
          <Text
            style={{
              textAlign: 'center',
              bottom: '82%',
              fontWeight: '500',
              position: 'absolute',
              fontSize: 24,
            }}>
            @{data.name}
          </Text>
          <Pressable
            style={{position: 'absolute', bottom: '82%', left: '85%'}}
            onPress={onPress}
            >
            <MaterialCommunityIcons
              style={{}}
              name="dots-vertical"
              color={'#191C21'}
              size={32}
            />
          </Pressable>

          <Image style={styles.img} source={{uri: data.image}} />

        </View>
        <View
          style={{
            alignContent: 'center',
            width: 300,
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={styles.description}>
            Не следует, однако, забывать, что высокое качество позиционных
            исследований говорит о возможностях системы массового участия.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '70%',
            flexWrap: 'wrap',
          }}>
          {arr.map(a => {
            return (
              <View
                style={{
                  backgroundColor: '#bceaff',
                  borderRadius: 50,
                  overflow: 'hidden',
                  padding: '4%',
                  margin: 5,
                  borderColor: '#097fb4',
                  borderWidth: 2,
                }}
                key={a}>
                <Text style={{fontSize: 15}}>{a}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.icons}>
          {icons.map(a => {
            return (
              <FontAwesome
                key={a}
                style={{}}
                name={a}
                color={'#191C21'}
                size={40}
              />
            );
          })}
        </View>
        <View style={styles.imgs}>
          {/* {data.map(item => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailScreen', {item})}
              key={item.id}>
              <Image style={styles.photos} source={{uri: item.image_url}} />
            </TouchableOpacity>
          );
        })} */}
        </View>
        <View style={{height: 250}}></View>
      </ScrollView>
    </View>
  );
};


export default AnotherProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#bceaff',
  },
  img: {
    backgroundColor: 'black',
    width: 300,
    height: 300,
    borderRadius: 150,
    marginTop: 60,
  },
  oval: {
    backgroundColor: '#097fb4',
    width: width,
    height: 500,
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 200,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
  },
  oval1: {
    width: 55,
    height: 52,
    borderRadius: 50,
    backgroundColor: '#d0debb',
    transform: [{scaleX: 3}],
    textTransform: 'none',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor:'#f8de8d',
    // borderWidth:2
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    width: '100%',
    backgroundColor: '#bceaff',
    height: 70,
    alignContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#097fb4',
    borderTopWidth: 1,
    borderTopColor: '#097fb4',
    marginTop: 20,
  },
  imgs: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',

    marginTop: 20,
    flexWrap: 'wrap',
  },
  photos: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: 3,
    borderRadius: 10,
  },
  name: {
    textAlign: 'center',
    transform: [{scaleY: 3}],
    fontSize: 9,
  },
});
