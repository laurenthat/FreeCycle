import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {List, Avatar, Divider} from 'react-native-paper';
import {useUser, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uploadsUrl} from '../utils/variables';

const Like = ({singleLike}) => {
  const item = singleLike;
  const [avatar, setAvatar] = useState('');
  const [owner, setOwner] = useState({});
  const [userHasAvatar, setUserHasAvatar] = useState(false);

  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();

  const firstRow = (props) => (
    <View style={styles.firstRow}>
      <Text>{'@' + owner.username + 'has liked your post'}</Text>
    </View>
  );
  const leftContent = (props) =>
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
      console.log('owner', owner);
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
    loadAvatar();
  }, []);

  return (
    <>
      <List.Item style={styles.list} title={firstRow} left={leftContent} />
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
});

Like.propTypes = {
  singleLike: PropTypes.object,
};

export default Like;
