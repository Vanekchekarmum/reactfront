import { View, Text } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View style={{flex:1, justifyContent:'center'}}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>HomeScreen</Text>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>All Products</Text>
    </View>
  )
}

export default HomeScreen