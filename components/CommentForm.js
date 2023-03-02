import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useComment} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';
import {TextInput} from 'react-native-paper';

const CommentForm = ({navigation, route}) => {
  const {file_id: fileId} = route.params;
  const [text, setText] = useState('');
  const {postComment} = useComment();
  // const [update, setUpdate] = useState(false);
  const isTextareaDisabled = text.length === 0;

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
            // update 'update' state in context
            // setUpdate(!update);
            // reset form
            // reset();
            // TODO: navigate to home
            // navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('file upload failed', error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <TextInput
        placeholder="Leave a comment!"
        style={{backgroundColor: '#f8f4fc'}}
        onChangeText={(text) => setText(text)}
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
