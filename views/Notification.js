import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import CommentList from '../components/CommentList';
import LikeList from '../components/LikeList';
import {useRoute} from '@react-navigation/native';

const Notification = (navigation) => {
  const route = useRoute();
  return (
    <SafeAreaView style={styles.container}>
      {/* <CommentList route={route} myFilesOnly={true} /> */}

      {/* <LikeList navigation={navigation} myFilesOnly={true} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 25,
  },
});

Notification.propTypes = {
  navigation: PropTypes.object,
};

export default Notification;
