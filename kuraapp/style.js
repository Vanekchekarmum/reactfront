import React, { useState } from 'react'

import { StyleSheet, View, Text } from "react-native"
const styles = StyleSheet.create({
  labelText: {
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 16,
    textAlign:'center'
  },
  input: {
    backgroundColor: 'white',
    marginTop: 30,
    width: '95%',
    height: 68,
    fontSize: 16,
    borderRadius: 4,
    textAlign: 'center',
  },
  inputWithLabel: {
    marginBottom: 10,
    marginTop: 5,
  },
});

const toastConfig = {
  warning: ({ text1, props }) => (
    <View style={{ height: 30, width: '100%', backgroundColor: 'orange', padding: 4, }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
  done: ({ text1, props }) => (
    <View style={{ height: 30, width: '100%', backgroundColor: '#1affc6', padding: 4, }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

export { styles, toastConfig }