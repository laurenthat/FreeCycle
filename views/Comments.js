import React from 'react';
import {StyleSheet} from 'react-native';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import PropTypes from 'prop-types';

const Comments = ({navigation, route}) => {
  return (
    <>
      <CommentList navigation={navigation} route={route} />
      <CommentForm
        style={styles.commentForm}
        navigation={navigation}
        route={route}
      />
    </>
  );
};

const styles = StyleSheet.create({
  commentForm: {
    // paddingBottom: 40,
    marginBottom: 40,
    margin: 40,
  },
});

Comments.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Comments;
