import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Vibration,
  Button,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SharedElement} from 'react-navigation-shared-element';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import * as Animatable from 'react-native-animatable';
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
  clockTick: true,
};
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const ITEM_HEIGHT = height * 0.5;
const DetailScreen = ({navigation, route}) => {
  const [liked, setLiked] = useState(false);
  const {item} = route.params;
  const buttonRef = React.useRef();
  const ONE_SECOND_IN_MS = 1000;
  const star = () => {
    setLiked(isLiked => !isLiked),
      ReactNativeHapticFeedback.trigger('impactHeavy', options);
  };
  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#097fb4'}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: '85%',
          top: height * 0.002,
          zIndex: 60,
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <Animatable.View
          ref={buttonRef}
          animation="fadeIn"
          duration={600}
          delay={300}>
          <MaterialCommunityIcons
            style={{
              position: 'absolute',
              right: '85%',
              top: height * 0.05,
              zIndex: 60,
            }}
            name="keyboard-backspace"
            color={'#191C21'}
            size={38}
          />
        </Animatable.View>
      </TouchableOpacity>
      <Animatable.View
        ref={buttonRef}
        animation="fadeIn"
        duration={600}
        delay={300}
        style={{textAlign: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            top: height * 0.06,
            fontSize: 20,
            fontWeight: '500',
          }}>
          @{item.owner}
        </Text>
      </Animatable.View>
      <Animatable.View
        ref={buttonRef}
        animation="fadeIn"
        duration={600}
        delay={300}
        style={[StyleSheet.absoluteFillObject]}>
        <MaterialCommunityIcons
          style={{position: 'absolute', left: '85%', top: height * 0.05}}
          name="dots-vertical"
          color={'#191C21'}
          size={38}
        />
      </Animatable.View>
      <View
        style={{
          backgroundColor: '#fff',
          margin: 15,
          height: '100%',
          marginTop: 70,
          borderRadius: 10,
          alignItems: 'center',
        }}>
        <View style={styles.topInto}>
          <View style={styles.time}>
            {/* <Button
        title="Vibrate with pattern until cancelled"
        onPress={() => Vibration.vibrate()}
      /> */}

            <TouchableOpacity onPress={() => Vibration.vibrate(PATTERN, true)}>
              <FontAwesome
                style={styles.markerIcon}
                name="money"
                color={'black'}
                size={38}
              />
            </TouchableOpacity>
            <Text style={{marginLeft: 15, fontSize: 20, fontWeight: '500'}}>
              бесплатно
            </Text>
          </View>
          <TouchableOpacity onPress={star}>
            <FontAwesome
              style={styles.starIcon}
              name={liked ? 'star' : 'star-o'}
              color={liked ? '#ff844d' : 'black'}
              size={34}
            />
          </TouchableOpacity>
        </View>
        {/* <SharedElement id={`item.${item.id}.image_url`}> */}
        <Image
          source={{uri: item.image_url}}
          style={{
            width: ITEM_HEIGHT * 0.8,
            height: ITEM_HEIGHT * 0.8,
            borderRadius: 10,
            marginTop: 15,
          }}
          resizeMode="cover"
        />
        {/* </SharedElement> */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            width: ITEM_HEIGHT * 0.8,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: width * 0.8,
              justifyContent: 'center',
            }}>
            <SharedElement id={`item.${item.id}.title`}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                }}>
                {item.title}
              </Text>
            </SharedElement>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                marginTop: 10,
                width: width * 0.7,
              }}>
              {item.body}
            </Text>
            {/* <TouchableOpacity
              style={{backgroundColor: 'red', height: 100, width: 100}}
              onPress={() =>
                navigation.navigate('ChatScreen', {item})
              }></TouchableOpacity> */}
            {/* <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {item.categories.map(a => {
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
            </View> */}
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                color={'#191C21'}
                name="map-marker-circle"
                size={35}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: '500',
                  width: 300,
                }}>
                {item.place}
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                color={'#191C21'}
                name="clock-time-five-outline"
                size={35}
              />
              <Text style={{marginLeft: 10, fontSize: 20, fontWeight: '500'}}>
                {item.time}
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                color={'#191C21'}
                name="calendar"
                size={35}
              />
              <Text style={{marginLeft: 10, fontSize: 20, fontWeight: '500'}}>
                {item.date}
              </Text>
            </View>
            <View
              style={{
                marginTop: 30,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.arrow}
                onPress={() => navigation.navigate('ChatScreen', {item})}>
                <FontAwesome name="arrow-right" color={'white'} size={40} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{height: 200, width: '100%'}}></View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  topInto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {},
  starIcon: {
    marginRight: 15,
  },
  markerIcon: {
    marginLeft: 15,
  },
  arrow: {
    backgroundColor: '#ff844d',
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
});
DetailScreen.sharedElements = route => {
  const {item} = route.params;
  return [
    {
      id: `item.${item.id}.image_url`,
      animation: 'move',
      resize: 'clip',
    },

    {
      id: `item.${item.id}.title`,
      animation: 'fade',
      resize: 'clip',
    },
  ];
};
export default DetailScreen;
