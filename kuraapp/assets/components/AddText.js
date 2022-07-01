import React from 'react';
import {StyleSheet, Text} from 'react-native';


const AddText = ({text}) => {
  return (
<Text style={styles.text}>{text}</Text>  
);
};
export default AddText;
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: '500',
  },
});
