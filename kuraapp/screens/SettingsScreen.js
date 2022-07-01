import React from "react";
import { View,Text, TouchableOpacity } from "react-native";
import { removeToken } from 'kura/services/AsyncStorageService.js';
import { useSelector } from 'react-redux';
const SettingsScreen = ({navigation}) =>{
    const myData = useSelector(state => state.user)
    const myAccessToken = useSelector(state => state.auth)
    const handleLogout = () => {
      navigation.navigate('ProfileScreen');
      console.log("Logout")
    }
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
            <TouchableOpacity style={{width:200, height:200, backgroundColor:'green'}} onPress={handleLogout}>
            <Text> Выйти</Text>
            </TouchableOpacity>
        </View>
    )
}
export default SettingsScreen