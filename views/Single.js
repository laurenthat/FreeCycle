import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import {Icon} from '@rneui/themed';
import {Image} from '@rneui/base';
import {Video} from 'expo-av';
import {useFavourite, useUser, useComment, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import {uploadsUrl} from '../utils/variables';

const Single = ({navigation, route}) => {
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    media_type: type,
    file_id: fileId,
  } = route.params;
  const video = useRef(null);
  const [owner, setOwner] = useState({});
  const [likes, setLikes] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [comments, setComments] = useState([]);
  const [userLikesIt, setUserLikesIt] = useState(false);
  const [userHasAvatar, setUserHasAvatar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {user} = useContext(MainContext);

  const {getUserById} = useUser();
  const {getFavouritesByFileId, postFavourite, deleteFavourite} =
    useFavourite();
  const {getFilesByTag} = useTag();
  const {getCommentsByFileId} = useComment();

  const SubtitleContent = '@' + owner.username;
  const LeftContent = (props) =>
    userHasAvatar ? (
      <Avatar.Image size={45} source={{uri: uploadsUrl + avatar}} />
    ) : (
      <Avatar.Icon size={45} icon="account" />
    );

  const getOwner = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await getUserById(userId, token);
    setOwner(owner);
  };

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + userId);
      setAvatar(avatarArray.pop().filename);
      setUserHasAvatar(true);
    } catch (error) {
      console.log('user avatar fetch failed', error.message);
    }
  };

  const getLikes = async () => {
    const likes = await getFavouritesByFileId(fileId);
    // console.log('likes', likes, 'user', user);
    setLikes(likes);
    // check if the current user id is included in the 'likes' array and
    // set the 'userLikesIt' state accordingly
    for (const like of likes) {
      if (like.user_id === user.user_id) {
        setUserLikesIt(true);
        break;
      }
    }
  };

  const likeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavourite(fileId, token);
      setUserLikesIt(true);
      getLikes();
    } catch (error) {
      // note: you cannot like same file multiple times
      // console.log(error);
    }
  };

  const dislikeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavourite(fileId, token);
      setUserLikesIt(false);
      getLikes();
    } catch (error) {
      // note: you cannot like same file multiple times
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const comments = await getCommentsByFileId(fileId);
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  };

  const unlock = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.error('unlock', error.message);
    }
  };

  const lock = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    } catch (error) {
      console.error('lock', error.message);
    }
  };

  const showVideoInFullScreen = async () => {
    try {
      await video.current.presentFullscreenPlayer();
    } catch (error) {
      console.error('showVideoInFullScreen', error.message);
    }
  };

  useEffect(() => {
    getOwner();
    getLikes();
    loadAvatar();
    getComments();
    unlock();

    const orientSub = ScreenOrientation.addOrientationChangeListener((evt) => {
      console.log('orientation', evt);
      if (evt.orientationInfo.orientation > 2) {
        // show video in fullscreen
        if (video.current) showVideoInFullScreen();
      }
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub);
      lock();
    };
  }, [comments]);

  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}} behavior="position">
        <ScrollView>
          <Card style={styles.card} mode="elevated">
            <Card.Title
              title={title}
              subtitle={SubtitleContent}
              left={LeftContent}
            />
            {type === 'image' ? (
              <Card.Cover source={{uri: uploadsUrl + filename}} />
            ) : (
              <Video
                ref={video}
                source={{uri: uploadsUrl + filename}}
                style={{width: '100%', height: 200}}
                resizeMode="cover"
                useNativeControls
                onError={(error) => {
                  console.log(error);
                }}
                isLooping
              />
            )}
            <Card.Content>
              <Text variant="titleMedium">{description}</Text>
            </Card.Content>
            <Card.Actions style={styles.icon}>
              <Icon name="bookmark-outline" />
              <Text>{comments.length}</Text>
              <Icon name="chat-bubble-outline" />
              <Text>{likes.length}</Text>
              {userLikesIt ? (
                <Icon name="favorite" color="red" onPress={dislikeFile} />
              ) : (
                <Icon name="favorite-border" onPress={likeFile} />
              )}
            </Card.Actions>
            <Card.Content>
              <Text variant="bodyMedium">
                {new Date(timeAdded).toLocaleString('fi-FI')}
              </Text>
              <CommentForm
                style={styles.commentForm}
                navigation={navigation}
                route={route}
              />
            </Card.Content>
            <Card.Content style={{flexGrow: 1}}>
              <CommentList route={route} />
            </Card.Content>
          </Card>
        </ScrollView>
        <Modal
          visible={modalVisible}
          style={{flex: 1}}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          supportedOrientations={['portrait', 'landscape']}
        >
          <Image
            resizeMode="contain"
            onPress={() => setModalVisible(false)}
            style={{height: '100%'}}
            source={{uri: uploadsUrl + filename}}
          />
        </Modal>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    marginHorizontal: 10,
  },
  icon: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
});

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
