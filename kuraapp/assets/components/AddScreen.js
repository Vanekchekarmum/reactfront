import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';

const AddScreen = ({content}) => {
  return <ScrollView contentContainerStyle={styles.container}>{content}</ScrollView>;
};
export default AddScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bceaff',
    alignItems: 'center',
  },
});
