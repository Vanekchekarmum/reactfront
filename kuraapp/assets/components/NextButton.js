import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const NextButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.arrow} onPress={onPress}>
      <FontAwesome name="arrow-right" color={'white'} size={40} />
    </TouchableOpacity>
  );
};
export default NextButton;
const styles = StyleSheet.create({
  arrow: {
    position: 'absolute',
    bottom: 120,
    backgroundColor: '#ff844d',
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
});
