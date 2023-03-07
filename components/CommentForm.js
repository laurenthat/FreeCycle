import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

const CommentForm = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>CommentForm</Text>
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

export default CommentForm;
