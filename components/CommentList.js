import React from 'react';
import Comment from '../components/Comment';
import {FlatList} from 'react-native';
import {useState, useEffect} from 'react';
import {useComment} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const CommentList = ({navigation, route}) => {
  const fileId = route.params;
  const [comments, setComments] = useState([]);
  const {getCommentsByFileId} = useComment();

  const getComments = async () => {
    try {
      const comments = await getCommentsByFileId(fileId);
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const singleComment = ({item}) => <Comment single={item} />;

  return (
    <FlatList
      data={comments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={singleComment}
    />
  );
};

CommentList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CommentList;
