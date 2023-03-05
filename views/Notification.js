import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Notification</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Notification;
