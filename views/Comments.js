import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

const Comments = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Comments</Text>
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

export default Comments;