import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Comment from '../components/Comment';
import {useComment} from '../hooks/ApiHooks';

const CommentList = ({route}) => {
  const {file_id: fileId} = route.params;
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
  }, [comments]);

  return (
    <>
      {comments
        .slice(0)
        .reverse()
        .map((comment, index) => (
          <Comment key={index} single={comment} />
        ))}
    </>
  );
};

CommentList.propTypes = {
  route: PropTypes.object,
};

export default CommentList;
