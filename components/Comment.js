import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {List, Avatar, Divider} from 'react-native-paper';
import {useUser, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uploadsUrl} from '../utils/variables';
import {useMedia} from '../hooks/ApiHooks';

const Comment = ({single, navigation, route, myFilesOnly}) => {
  const item = single;
  const [avatar, setAvatar] = useState('');
  const [owner, setOwner] = useState({});
  const [userHasAvatar, setUserHasAvatar] = useState(false);
  const routeName = route.name;

  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const {mediaArray} = useMedia(myFilesOnly);

  const firstRow = () => (
    <View style={styles.firstRow}>
      <Text>
        {routeName != 'Notifications'
          ? '@' + owner.username
          : '@' + owner.username + ' commented on '}
      </Text>
      <Text style={styles.postTitle}>
        {routeName === 'Notifications' ? getPostTitle() : ''}
      </Text>
      <Text style={styles.date}>
        {routeName === 'Notifications'
          ? ''
          : new Date(item.time_added).toLocaleString('fi-FI')}
      </Text>
    </View>
  );
  const leftContent = () =>
    userHasAvatar ? (
      <Avatar.Image size={45} source={{uri: uploadsUrl + avatar}} />
    ) : (
      <Avatar.Icon size={45} icon="account" />
    );

  const getOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const owner = await getUserById(item.user_id, token);
      setOwner(owner);
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

  const getPostTitle = () => {
    let postTitle = '';
    for (let i = 0; i < mediaArray.length; i++) {
      postTitle = mediaArray[i].title;
    }
    return postTitle;
  };

  useEffect(() => {
    getOwner();
    loadAvatar();
  }, []);

  return (
    <>
      <List.Item
        style={styles.list}
        title={firstRow}
        titleNumberOfLines={2}
        description={item.comment}
        descriptionNumberOfLines={7}
        left={leftContent}
      />
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingRight: 16,
  },
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
  postTitle: {
    fontWeight: 'bold',
    color: '#fdaa5e',
  },
});

Comment.propTypes = {
  single: PropTypes.object,
  navigation: PropTypes.object,
  route: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default Comment;
