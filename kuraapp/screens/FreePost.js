import React from 'react';
import { View, StyleSheet, Text, StatusBar, Image, Pressable, Dimensions, Switch} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('window');
const FreePost = () =>{
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    return(
        <View style={{flex:1, backgroundColor:'#bceaff',alignItems:'center'}}>
         <View style={styles.header}>
        </View>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flex:1, backgroundColor:'#bceaff', alignItems:'center', justifyContent:'center'}} >

            <Text style={{fontWeight:'500', fontSize:30, textAlign:'center'}}>Готово! 🥳</Text>
      </ScrollView>
      <View style={{height:150}}>

      </View>

        </View>

    )
}
export default FreePost
const styles = StyleSheet.create({
    header:{
      backgroundColor: '#097fb4',
      width:width,
      height:width*0.23,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    arrow:{
      position:'absolute',
      bottom:120,
      backgroundColor:'#ff844d',
      width:66,
      height:66,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:40,
    },
    input:{
        backgroundColor:"white",
        marginTop:30,
        width:width * 0.9,
        height: 68,
        fontSize: 16,
        borderRadius:4,
        textAlign:'center'
    },
    input2:{
        backgroundColor:"white",
        marginTop:20,
        width:width * 0.9,
        height: height*0.4,
        fontSize: 16,
        borderRadius:4,
        textAlign:'center'


    }
    
  })
  