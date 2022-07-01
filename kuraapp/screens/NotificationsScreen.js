import React from "react";
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
  const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

const NotificationsScreen = () =>{
    return(
        <View style={{flex:1, backgroundColor:'#bceaff'}}>
                <View style={styles.header}>
    <MaterialCommunityIcons style={styles.searchIcons} name="keyboard-backspace" color={'black'} size={38}/>
    </View>
    <ScrollView
    indicatorStyle='white'
    contentContainerStyle={styles.lenta}>
    
            <Text style={{fontSize:35, fontWeight:'500', textAlign:'center', }}>Тут пока пусто 🤪</Text>
            <Text style={{fontSize:50, fontWeight:'500', textAlign:'center', }}></Text>
            <View style={{width:'100%', height:100}}>

            </View>
            </ScrollView>

        </View>
    )


}
const styles = StyleSheet.create({
    header:{
        backgroundColor: '#097fb4',
        width:width,
        height:width*0.23,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      },
      searchIcons:{
        marginTop:22,
        marginLeft:25
      },
      catIcons:{
        marginTop:22,
        marginRight:25
      },
      
      lenta:{
        alignItems: 'center',
        backgroundColor:'#bceaff',
        justifyContent:'center',
        textAlign:'center',
        flex:1
    },
    


})
export default NotificationsScreen





// import React, { useState, useRef } from 'react';
// import {
//     Animated,
//     Dimensions,
//     StyleSheet,
//     Text,
//     TouchableHighlight,
//     View,
// } from 'react-native';
// const { width } = Dimensions.get('screen');

// import { SwipeListView } from 'react-native-swipe-list-view';
// const data = [
//     {
//       id: '1',
//       title: 'Manarola, Italy',
//       description: 'The Cliffs of Cinque Terre',
//       image_url:
//         'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80',
//       iconName: 'location-pin'
//     },
//     {
//       id: '2',
//       title: 'Venezia, Italy',
//       description: 'Rialto Bridge, Venezia, Italy',
//       image_url:
//         'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=630&q=80',
//       iconName: 'location-pin'
//     },
//     {
//       id: '3',
//       title: 'Prague, Czechia',
//       description: 'Tram in Prague',
//       image_url:
//         'https://images.unsplash.com/photo-1513805959324-96eb66ca8713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
//       iconName: 'location-pin'
//     }
//   ];
// const rowTranslateAnimatedValues = {};
// Array(20)
//     .fill('')
//     .forEach((_, i) => {
//         rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
//     });

// export default function SwipeToDelete() {
//     const [listData, setListData] = useState(
//         Array(20)
//             .fill('')
//             .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
//     );

//     const animationIsRunning = useRef(false);

//     const onSwipeValueChange = swipeData => {
//         const { key, value } = swipeData;
//         if (
//             value < -Dimensions.get('window').width &&
//             !animationIsRunning.current
//         ) {
//             animationIsRunning.current = true;
//             Animated.timing(rowTranslateAnimatedValues[key], {
//                 toValue: 0,
//                 duration: 200,
//                 useNativeDriver: false,
//             }).start(() => {
//                 const newData = [...listData];
//                 const prevIndex = listData.findIndex(item => item.key === key);
//                 newData.splice(prevIndex, 1);
//                 setListData(newData);
//                 animationIsRunning.current = false;
//             });
//         }
//     };

//     const renderItem = data => (
//         <Animated.View
//             style={[
//                 styles.rowFrontContainer,
//                 {
//                     height: rowTranslateAnimatedValues[
//                         data.item.key
//                     ].interpolate({
//                         inputRange: [0, 1],
//                         outputRange: [0, 50],
//                     }),
//                 },
//             ]}
//         >
//             <TouchableHighlight
//                 onPress={() => console.log('You touched me')}
//                 style={styles.rowFront}
//                 underlayColor={'#AAA'}
//             >
//                 <View>
//                     <Text>I am {data.item.text} in a SwipeListView</Text>
//                 </View>
//             </TouchableHighlight>
//         </Animated.View>
//     );

//     const renderHiddenItem = () => (
//         <View style={styles.rowBack}>
//             <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
//                 <Text style={styles.backTextWhite}>Delete</Text>
//             </View>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <SwipeListView
//                 disableRightSwipe
//                 data={listData}
//                 renderItem={renderItem}
//                 renderHiddenItem={renderHiddenItem}
//                 rightOpenValue={-Dimensions.get('window').width}
//                 onSwipeValueChange={onSwipeValueChange}
//                 useNativeDriver={false}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     rowFrontContainer:{
//         backgroundColor:'green',
//         marginTop:20,
//         width:width * 0.9



//     },
//     container: {
//         backgroundColor: 'white',
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor:'purple'
//     },
//     backTextWhite: {
//         color: '#FFF',
//     },
//     rowFront: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderWidth:1, 
//         borderColor:'red',
//         backgroundColor:'white',
//         height:50,
//         borderRadius:18,

        

//     },
//     rowBack: {
//         alignItems: 'center',
//         backgroundColor: 'red',
//         flex: 1,
//         flexDirection: 'row',
//         borderRadius:18,
//         marginTop:20,


//     },
//     backRightBtn: {
//         alignItems: 'center',
//         bottom: 0,
//         justifyContent: 'center',
//         position: 'absolute',
//         width: 75,
//         borderRadius:18,
//         height:50

//     },
//     backRightBtnRight: {
//         backgroundColor: 'red',
//         right: 0,
//     },
// });
