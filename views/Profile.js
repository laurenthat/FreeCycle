import {Alert, Dimensions} from 'react-native';
import {Avatar, Accessory} from 'react-native-elements';
import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {MainContext} from '../contexts/MainContext';
import {useTag, useMedia} from '../hooks/ApiHooks';
import TopBarNavigator from '../navigators/TopBarNavigator';
import {uploadsUrl} from '../utils/variables';
import {Card, Appbar, Menu} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState([]);
  const windowWidth = Dimensions.get('window').width;
  const [visible, setVisible] = React.useState(false);
  const {postMedia} = useMedia();
  const {postTag} = useTag();

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      setAvatar(avatarArray.pop().filename);
    } catch (error) {
      console.log('user avatar fetch failed', error.message);
    }
  };

  const modifyAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });
    console.log('Imagepicker', result);
    if (!result.canceled) {
      setAvatar(result.assets[0]);
      const token = await AsyncStorage.getItem('userToken');
      const formData = new FormData();
      formData.append('title', 'avatar');

      const filename = result.assets[0].uri.split('/').pop();
      let fileExt = filename.split('.').pop();
      if (fileExt === 'jpg') fileExt = 'jpeg';
      const mimeType = result.assets[0].type + '/' + fileExt;
      formData.append('file', {
        uri: result.assets[0].uri,
        name: filename,
        type: mimeType,
      });
      try {
        const result = await postMedia(formData, token);
        const appTag = {
          file_id: result.file_id,
          tag: 'avatar_' + user.user_id,
        };
        const tagResult = await postTag(appTag, token);
        console.log('tag result', tagResult);
        Alert.alert('Profile photo changed', result.message, [
          {
            text: 'OK',
            onPress: () => {
              loadAvatar();
            },
          },
        ]);
      } catch (error) {
        console.error('avatar upload failed', error);
      }
    }
  };

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="dots-vertical" onPress={openMenu} />
      </Appbar.Header>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={{x: windowWidth, y: 100}}
      >
        <Menu.Item
          onPress={() => {
            navigation.navigate('EditProfile', {user: user});
            closeMenu();
          }}
          title="Edit Profile"
        />
        <Menu.Item
          onPress={async () => {
            console.log('Loggin out!');
            setUser({});
            setIsLoggedIn(false);
            try {
              await AsyncStorage.clear();
            } catch (error) {
              console.error('clearing asyncstoreage failed', error);
            }
          }}
          title="Log out"
        />
      </Menu>
      <Card
        mode="contained"
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Avatar
          source={{uri: uploadsUrl + avatar}}
          rounded
          size={120}
          onPress={modifyAvatar}
          title={user.username}
        >
          <Accessory size={20} />
        </Avatar>
        <Card.Title
          title={user.username}
          titleVariant="titleLarge"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        />
      </Card>
      <TopBarNavigator />
    </>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
