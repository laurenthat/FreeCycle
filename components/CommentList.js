import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Comment from '../components/Comment';
import {useComment} from '../hooks/ApiHooks';
import {useMedia} from '../hooks/ApiHooks';

const CommentList = ({route, myFilesOnly, navigation}) => {
  const [comments, setComments] = useState([]);
  const {getCommentsByFileId} = useComment();
  const {mediaArray} = useMedia(myFilesOnly);
  const routeName = route.name;

  const getComments = async (route) => {
    try {
      let comments = [];
      if (routeName === 'Notification') {
        for (let i = 0; i < mediaArray.length; i++) {
          comments = await getCommentsByFileId(mediaArray[i].file_id);
        }
      } else {
        const {file_id: fileId} = route.params;
        comments = await getCommentsByFileId(fileId);
      }
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
          <Comment
            key={index}
            single={comment}
            route={route}
            navigation={navigation}
          />
        ))}
    </>
  );
};

CommentList.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default CommentList;
