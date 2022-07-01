import React from "react";
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
  } from 'react-native';
  const { width } = Dimensions.get('screen');
  import { useNavigation } from '@react-navigation/native';


const Unauth = () =>{
    const navigation = useNavigation()

    return(
        <View style={{flex:1, backgroundColor:'#bceaff'}}>
                <View style={styles.header}>
    </View>
    <ScrollView
    indicatorStyle='white'
    contentContainerStyle={styles.lenta}>
    
            <Text style={{fontSize:35, fontWeight:'500', textAlign:'center', }}>Тут пока пусто 🤪</Text>
            <Text style={{fontSize:50, fontWeight:'500', textAlign:'center', }}></Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserLogin')} >
                <Text>Войти</Text>
            </TouchableOpacity >
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
    button:{
        height:100,
        width:100,
        backgroundColor:'red'
    }
    


})
export default Unauth