import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AddText from '../assets/components/AddText';
const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('window');

const Item = ({title, clrs}) => (
  <TouchableOpacity>
    <View style={[styles.item, {backgroundColor: clrs}]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);
const CategoryScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={{marginBottom: height * 0.5, alignItems:'center',justifyContent:'center'}}>
        <AddText text="Нужны сервера" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bceaff',
  },
  item: {
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    color: 'white',
  },
  header: {
    backgroundColor: '#097fb4',
    width: width,
    height: width * 0.23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default CategoryScreen;
// import React from 'react';
// import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Dimensions , TouchableOpacity} from 'react-native';

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'Рекомендации',
//     clrs:'#fe9000'
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Бизнес и карьера',
//     clrs:'#df4949'

//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Семья',
//     clrs:'#c238ab'
//   },
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b9',
//     title: 'Развлечения',
//     clrs:'#8756dc'
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f60',
//     title: 'Технологии',
//     clrs:'#4891fd'

//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29773',
//     title: 'Спорт и здоровье',
//     clrs:'#3acb71'

//   },

//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29774',
//     title: 'Искусство',
//     clrs:'#efcc06'

//   },
// ];

// const { width } = Dimensions.get('screen');
// const { height } = Dimensions.get('window');
// const Item = ({ title, clrs }) => (
//   <TouchableOpacity >
//   <View style={[styles.item,{backgroundColor: clrs,}]}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
//   </TouchableOpacity>
// );
// const CategoryScreen = () =>{
//   const { item } = route.params;

//     const renderItem = ({ item }) => (
//         <Item title={item.title} clrs={item.clrs} />
//       );

//       return (
//         <View style={styles.container}>
//                           <View style={styles.header}>
//         </View>
//           <FlatList
//             data={DATA}
//             renderItem={renderItem}
//             keyExtractor={item => item.id}
//             style={{marginTop:10}}
//           />
//         </View>
//       );
// }
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor:'#bceaff'
//     },
//     item: {
//       padding: 20,
//       marginVertical: 5,
//       marginHorizontal: 16,
//       borderRadius:10,
//       alignItems:'center',
//       justifyContent:'center',
//     },
//     title: {
//       fontSize: 32,
//       fontWeight:'500',
//       color:'white'

//     },
//     header:{
//       backgroundColor: '#097fb4',
//       width:width,
//       height:width*0.23,
//       flexDirection:'row',
//       alignItems:'center',
//       justifyContent:'space-between'
//     },
//   });
// export default CategoryScreen
