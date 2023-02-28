import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, ListItem, Text} from '@rneui/themed';
import {useState, useEffect} from 'react';
import {useComment, useUser, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const Comment = ({single}) => {
  const item = single;
  const [avatar, setAvatar] = useState('');
  const [comments, setComments] = useState([]);
  const [owner, setOwner] = useState({});
  const [userHasAvatar, setUserHasAvatar] = useState(false);

  const {getCommentsByFileId} = useComment();
  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const usernameContent = '@' + owner.username;

  const getOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const owner = await getUserById(item.user_id, token);
      setOwner(owner);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const comments = await getCommentsByFileId(item.file_id);
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  };

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + item.user_id);
      setAvatar(avatarArray.pop().filename);
      setUserHasAvatar(true);
    } catch (error) {
      console.log('user avatar fetch failed', error.message);
    }
  };

  useEffect(() => {
    getOwner();
    getComments();
    loadAvatar();
  }, []);

  return (
    <>
      <ListItem bottomDivider>
        {userHasAvatar ? (
          <Avatar rounded size={40} source={{uri: uploadsUrl + avatar}} />
        ) : (
          <Avatar
            rounded
            size={40}
            icon={{name: 'person', type: 'material'}}
            containerStyle={{backgroundColor: '#6656a5'}}
          />
        )}
        <ListItem.Content style={styles.allContent}>
          <ListItem.Content style={styles.firstRow}>
            <ListItem.Title style={styles.title}>
              {usernameContent}
            </ListItem.Title>
            <Text style={styles.date}>
              {new Date(item.time_added).toLocaleString('fi-FI')}
            </Text>
          </ListItem.Content>
          <ListItem.Content style={styles.secondRow}>
            <ListItem.Subtitle>{item.comment}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'flex-start',
  },
  allContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  firstRow: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
  secondRow: {
    flex: 1,
  },
});

Comment.propTypes = {
  single: PropTypes.object,
};

export default Comment;
