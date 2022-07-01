import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  RefreshControl,
  Share,
  ActionSheetIOS,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;
export default function NewsScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [result, setResult] = useState('🔮');

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
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'а серверов то нет',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const getMovies = async () => {
    try {
      const response = await fetch('http://192.168.254.45:8000/api/user/posts/');
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
  const onRefr = () => {
    setData([]);
    getMovies();
  };
  const jopa = item => {
    navigation.navigate('AnotherProfile', {
      screen: 'LentaNavig',
      itme: {item: item},
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen')}>

        <FontAwesome
          style={styles.searchIcons}
          name="search"
          color={'black'}
          size={30}
        />
                </TouchableOpacity>

        <TouchableOpacity
        acity onPress={() => navigation.navigate('CategoryScreen')}>
          <MaterialCommunityIcons
            style={styles.catIcons}
            name="format-list-checkbox"
            color={'black'}
            size={38}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.lenta}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefr} />
        }>
        {data.map(item => (
          <View style={styles.box} key={item.id}>
            <View style={styles.box1}>
              <View style={styles.boxHeader}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AnotherProfile', {item})}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      marginLeft: 10,
                    }}>
                    <Image
                      style={{
                        backgroundColor: 'black',
                        width: ITEM_HEIGHT * 0.15,
                        height: ITEM_HEIGHT * 0.15,
                        borderRadius: 50,
                      }}
                      source={{uri: item.user_img}}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#000',
                        fontWeight: '600',
                        marginLeft: 10,
                      }}>
                      @{item.owner}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress} style={{position: 'absolute', left: '85%'}}>
                  <MaterialCommunityIcons
                    color={'#191C21'}
                    name="dots-vertical"
                    size={35}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('DetailScreen', {item})}>
                <Image
                  style={{
                    width: ITEM_WIDTH * 0.92,
                    height: ITEM_HEIGHT * 0.92,
                    marginTop: ITEM_HEIGHT * 0.04,
                    marginBottom: ITEM_HEIGHT * 0.04,
                  }}
                  source={{uri: item.image_url}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: 'white',
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT * 0.2,
                  alignItems: 'flex-start',
                  alignContent: 'center',
                  justifyContent: 'center',
                  borderTopRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderTopColor: '#097fb4',
                  borderTopWidth: 3,
                  borderBottomRightRadius: 10,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: 300,
                  }}>
                  <MaterialCommunityIcons
                    style={{position: 'absolute', left: '4%'}}
                    color={'#191C21'}
                    name="map-marker-circle"
                    size={35}
                  />
                  <SharedElement id={`item.${item.id}.title`}>
                    <Text
                      numberOfLines={1}
                      style={{
                        marginLeft: 60,
                        fontWeight: 'bold',
                        fontSize: 16,
                        width: width * 0.6,
                        textAlign: 'center',
                      }}>
                      {item.title}
                    </Text>
                  </SharedElement>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{position: 'absolute', left: '85%'}}
                  onPress={onShare}>
                  <MaterialCommunityIcons
                    color={'#191C21'}
                    name="share-outline"
                    size={35}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        <View style={{height: width * 0.5}}></View>
      </ScrollView>
    </View>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bceaff',
  },
  header: {
    backgroundColor: '#097fb4',
    width: width,
    height: width * 0.23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchIcons: {
    marginTop: 22,
    marginLeft: 25,
  },
  catIcons: {
    marginTop: 22,
    marginRight: 25,
  },
  lenta: {
    alignItems: 'center',
    backgroundColor: '#bceaff',
    marginTop: 100,
  },

  box: {
    backgroundColor: '#fff',
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginBottom: 150,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#097fb4',
  },
  box1: {
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#097fb4',
  },
  boxHeader: {
    backgroundColor: 'white',
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT * 0.2,
    borderBottomColor: '#097fb4',
    borderBottomWidth: 3,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {},
});
