import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useComment} from '../hooks/ApiHooks';

const CommentForm = ({navigation, route}) => {
  const {file_id: fileId} = route.params;
  const [text, setText] = useState('');
  const {postComment} = useComment();
  const isTextareaDisabled = text.length === 0;

  const sendComment = async () => {
    const commentData = {
      file_id: fileId,
      comment: text,
    };
    console.log('comment data', commentData);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postComment(commentData, token);
      setText('');
      console.log('result', result);
    } catch (error) {
      console.error('file upload failed', error);
    }
  };

  return (
    <>
      <TextInput
        placeholder="Leave a comment!"
        style={{backgroundColor: '#f8f4fc'}}
        onChangeText={(text) => setText(text)}
        value={text}
        left={<TextInput.Icon size={24} icon="account" />}
        right={
          <TextInput.Icon
            icon="send"
            onPress={sendComment}
            disabled={isTextareaDisabled}
          />
        }
      />
    </>
  );
};

CommentForm.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default CommentForm;
