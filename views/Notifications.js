import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import CommentList from '../components/CommentList';

const Notifications = (navigation) => {
  const {route} = navigation;

  return (
    <SafeAreaView style={styles.container}>
      <CommentList route={route} navigation={navigation} myFilesOnly={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
  },
});

Notifications.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Notifications;
