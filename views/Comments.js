import React from 'react';
import CommentList from '../components/CommentList';

const Comments = ({navigation, route}) => {
  return (
    <>
      <CommentList navigation={navigation} route={route} />
    </>
  );
};

export default Comments;
