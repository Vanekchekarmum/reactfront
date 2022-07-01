import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import {StyleSheet, View, Dimensions, ActivityIndicator} from 'react-native';
import {getToken} from 'kura/services/AsyncStorageService';
import {useRoute} from '@react-navigation/native';
import NextButton from '../assets/components/NextButton';
import AddHeader from '../assets/components/AddHeader';
import AddText from '../assets/components/AddText';

const {height} = Dimensions.get('window');

const DateScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [usertoken, setUserToken] = React.useState();
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState('')
  const [dates, setDates] = useState('')


  const route = useRoute();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        const {access, refresh} = JSON.parse(token);
        setUserToken({
          access: access,
          refresh: refresh,
        });
      }
    })();
  }, []);
  const pop = () => {

    PicturePath = route.params.i.image_url;
    URLpath = 'http://192.168.254.45:8000/api/user/postsall/';
    const {access} = usertoken;

    var formData = new FormData();
    formData.append('image_url', {
      uri: PicturePath,
      name: 'kkkkk.jpg',
      type: 'image/jpg',
    });
    formData.append('title', route.params.text.text);
    formData.append('body', route.params.text1.text1);
    formData.append('place', route.params.w.place);
    formData.append('long', route.params.long.long);
    formData.append('lati', route.params.lati.lati);
    formData.append('categories', route.params.categories.categories);
    formData.append('datetim', date.toISOString());
    formData.append('date', date.toLocaleDateString());
    formData.append('time', date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));


    setLoading(true);

    console.log(date);
    fetch(URLpath, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${access}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(responseJson => {
        setLoading(false);
        navigation.navigate('FinalScreen')

        // console.log(responseJson);
        // console.log(formData)
      })
      .catch(error => {
        // console.log(error);
      });

  };
  const lol = () => {
    console.log(date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
  };
  if (loading) {
    return (
  <View style={{    flex:1,
    backgroundColor:'#bceaff',
    justifyContent:'center',
    alignItems:'center'}}>
    <ActivityIndicator size="large" loading={loading} />
  </View>
    );
  }
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#bceaff'}}>
        <AddHeader />
        <View style={styles.box}>
          <AddText text={'Выбери дату и время 🤓'} />
          <DatePicker
            style={styles.date}
            date={date}
            onDateChange={setDate}
            mode="datetime"
            locale={'ru'}
            timeZoneOffsetInMinutes={0}
          />
        </View>
        <NextButton onPress={pop} />
      </View>
    );
  }

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: '500',
    //   marginTop:25
  },
  date: {
    marginTop: -55,
  },
  box: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: height * 0.7,
  },
});
export default DateScreen;
