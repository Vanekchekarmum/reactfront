import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
  {
    id: '1',
    title: 'Manarola, Italy',
    description: 'The Cliffs of Cinque Terre',
    image_url:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80',
    iconName: 'location-pin'
  },
  {
    id: '2',
    title: 'Venezia, Italy',
    description: 'Rialto Bridge, Venezia, Italy',
    image_url:
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=630&q=80',
    iconName: 'location-pin'
  },
  {
    id: '3',
    title: 'Prague, Czechia',
    description: 'Tram in Prague',
    image_url:
      'https://images.unsplash.com/photo-1513805959324-96eb66ca8713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    iconName: 'location-pin'
  }
];
const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;
export default function FontsScreen({ navigation }) {
  return (
    <View style={{flex:1, backgroundColor:'#d0debb'}}>
    <View style={{  backgroundColor: '#8faf8a', width:width, height:width*0.23,
     flexDirection:'row', alignItems:'center'}}>
    <MaterialCommunityIcons  name="format-list-checkbox" color={'red'} size={38} />
    <MaterialCommunityIcons  name="format-list-checkbox" color={'red'} size={38} />

    </View>
  <ScrollView
    indicatorStyle='white'
    contentContainerStyle={{ alignItems: 'center', backgroundColor:'#d0debb', marginTop:100 }}
  >

    {data.map(item => (

      <View style={{backgroundColor:'white',width: ITEM_WIDTH,height:ITEM_HEIGHT, marginBottom:150, alignItems:'center',borderRadius:20, justifyContent:'center', borderWidth:3, borderColor:'#207DCA'  }} key={item.id}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ borderRadius:10, backgroundColor:'white', alignItems:'center',borderWidth:3, borderColor:'#8faf8a'}}
          onPress={() => navigation.navigate('DetailScreen', { item })}
        >
          <View style={{backgroundColor:'white',width:ITEM_WIDTH, height:ITEM_HEIGHT * 0.2,
             alignContent:'center' ,
             justifyContent:'space-around',
             borderBottomColor:'#8faf8a', borderBottomWidth:3 ,borderTopRightRadius:10,
             borderTopLeftRadius:10,flexDirection:'row' ,alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center', 
            justifyContent:'space-around',}}>
            <Image style={{backgroundColor:'black', width:ITEM_HEIGHT * 0.15, 
            height:ITEM_HEIGHT * 0.15, borderRadius:50,marginRight:50}}/>
            <Text style={{fontSize:18, color:'#000',fontFamily:'Farah', fontWeight:'bold'}}>@MADENDA</Text>
            </View>
            <MaterialCommunityIcons style={{marginLeft:10}} color={'#191C21'} name='map-marker-circle' size={35}/>


          </View>
          <Image
            style={{
              width: ITEM_WIDTH * 0.92,
              height: ITEM_HEIGHT* 0.92,
              marginTop:ITEM_HEIGHT * 0.04,
              marginBottom:ITEM_HEIGHT * 0.04

            
            }}
            source={{ uri: item.image_url }}
            resizeMode='cover'
          />
                    <View style={{backgroundColor:'white',width:ITEM_WIDTH,
                     height:ITEM_HEIGHT * 0.2,
            alignItems:'flex-start', alignContent:'center' ,
             justifyContent:'center',borderTopRadius:10,
             borderBottomLeftRadius:10,borderTopColor:'#8faf8a', borderTopWidth:3 }}>
            <View style={{flexDirection:'row', alignItems:'center', 
            justifyContent:'space-around',}}>
              <MaterialCommunityIcons style={{marginLeft:10}} color={'#191C21'} name='map-marker-circle' size={35}/>

            <Text style={{marginLeft:10, fontWeight:'bold',fontSize:16}}>{item.title}</Text>
            </View>

          </View>
        </TouchableOpacity>
      </View>
    ))}
    <View style={{ height:width*0.5}}>

    </View>
  </ScrollView></View>

  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor:'red',
  },
  conHeader:{

  },
  img:{

  }

});
