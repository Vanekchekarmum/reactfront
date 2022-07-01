import React from 'react';
import {StyleSheet, TextInput, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');
const Input = ({value, onChangeText, placeholder, secureTextEntry}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize='none'

    />
  );
};
export default Input;
const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    marginTop: 30,
    width: width * 0.9,
    height: 68,
    fontSize: 16,
    borderRadius: 4,
    textAlign: 'center',
  },
});
