import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import PropTypes from "prop-types";
import LikeList from '../components/LikeList';

const Notifications = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LikeList />
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

Notifications.propTypes = {
  navigation: PropTypes.object,
};

export default Notifications;