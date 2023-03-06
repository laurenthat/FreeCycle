import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useComment} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const CommentForm = ({navigation, route}) => {
  const {file_id: fileId} = route.params;
  const [text, setText] = useState('');
  const {postComment} = useComment();
  const isTextareaDisabled = text.length === 0;
  const {update, setUpdate} = useContext(MainContext);

  const sendComment = async () => {
    console.log('send comment', text);
    const commentData = {
      file_id: fileId,
      comment: text,
    };
    console.log('comment data', commentData);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postComment(commentData, token);
      console.log('result', result);

      Alert.alert('Commented', 'comment id: ' + result.comment_id, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            setUpdate(!update);
            setText('');
          },
        },
      ]);
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
