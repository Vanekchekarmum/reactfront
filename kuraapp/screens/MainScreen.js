// import React from 'react';
// import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Pressable} from 'react-native';
// import TopBar from 'kura/assets/components/TopBar.js'
// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
    
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Image style={styles.img} source={require('./assets/imgs/shirt_roYXXTB.jpg')}/>
//     <View style={{maxHeight:70, maxWidth:250}}>
//     <Text style={styles.title}>{title}</Text>
//     </View>
//     <Pressable style={styles.btn}><Text>Добавить</Text></Pressable>
//   </View>
// );

// const App = () => {
//   const renderItem = ({ item }) => (
//     <Item title={item.title} />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <TopBar/>

//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}

//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 0,
//     borderRadius:30,
//     justifyContent:'center',
//     alignContent:'center',
//     alignItems:'center',
//     width:'100%'
//   },
//   title: {
//     fontSize: 32,
//   },
//   img:{
//     width:'90%',
//     borderRadius:30, 
//   }, 
//   btn:{
//     backgroundColor:'red',
//     width:'60%',
//     alignContent:'center',
//     justifyContent:'center',
//     alignItems:'center',
//     borderRadius:40
//   }
// });

// export default MainScreen;