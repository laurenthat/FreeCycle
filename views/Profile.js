import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Button, Card, Icon, ListItem} from '@rneui/themed';
import MyFiles from './MyFiles';
import PropTypes from 'prop-types';

const Profile = ({navigation}) => {
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      setAvatar(avatarArray.pop().filename);
    } catch (error) {
      console.log('user avatar fetch failed', error.message);
    }

  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <Card>
      <Card.Title>{user.username}</Card.Title>
      <Card.Image source={{uri: uploadsUrl + avatar}} />
      <ListItem>
        <Icon name="email"></Icon>
        <ListItem.Title>{user.email}</ListItem.Title>
      </ListItem>
      <ListItem>
        <Icon name="badge" />
        <ListItem.Title>{user.full_name}</ListItem.Title>
      </ListItem>
      <Button title="Logout!" onPress={async () => {
        console.log('Loggin out!');
        setUser({});
        setIsLoggedIn(false);
        try {
          await AsyncStorage.clear();
        } catch (error) {
          console.error('clearing asyncstoreage failed', error);
        }
      }}/>
      <Button 
        title="My Files" 
        onPress={() => {
          navigation.navigate('MyFiles')
        }}
      />
    </Card>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;