import React from 'react';
import CommentList from '../components/CommentList';
import PropTypes from 'prop-types';

const Comments = ({navigation, route}) => {
  return (
    <>
      <CommentList navigation={navigation} route={route} />
    </>
  );
};

Comments.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Comments;
