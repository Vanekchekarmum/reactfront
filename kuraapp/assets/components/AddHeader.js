import React from 'react';
import {  View, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');

const AddHeader = () =>{
    return (
        <View style={styles.header}/>
    )
}
export default AddHeader
const styles = StyleSheet.create({

    header:{
      backgroundColor: '#097fb4',
      width:width,
      height:width*0.23,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    
  });