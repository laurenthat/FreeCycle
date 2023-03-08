import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  Avatar,
  Card,
  Text,
  Button,
  IconButton,
  List,
  Menu,
  Divider,
} from 'react-native-paper';
import {Icon} from '@rneui/themed';
import {StyleSheet, Alert} from 'react-native';
import {useContext, useState, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useMedia,
  useUser,
  useFavourite,
  useComment,
  useTag,
} from '../hooks/ApiHooks';

const ListItem = ({singleMedia, navigation}) => {
  const {user, update, setUpdate} = useContext(MainContext);
  const item = singleMedia;
  const [avatar, setAvatar] = useState('');
  const [owner, setOwner] = useState({});
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [userLikesIt, setUserLikesIt] = useState(false);
  const [userHasAvatar, setUserHasAvatar] = useState(false);

  const {deleteMedia} = useMedia();
  const {getFavouritesByFileId, postFavourite, deleteFavourite} =
    useFavourite();
  const {getCommentsByFileId} = useComment();
  const {getFilesByTag} = useTag();
  const {getUserById} = useUser();

  const SubtitleContent = '@' + owner.username;
  const LeftContent = (props) =>
    userHasAvatar ? (
      <Avatar.Image size={45} source={{uri: uploadsUrl + avatar}} />
    ) : (
      <Avatar.Icon size={45} icon="account" />
    );

  const rightContent = () => {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
      <>
        {item.user_id === user.user_id && (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton icon="dots-vertical" size={30} onPress={openMenu} />
            }
          >
            <Menu.Item onPress={editPost} title="Edit" />
            <Divider />
            <Menu.Item onPress={deletePost} title="Delete" />
          </Menu>
        )}
      </>
    );
  };

  const editPost = () => {
    navigation.navigate('EditPost', item);
  };

  const deletePost = () => {
    try {
      Alert.alert('Delete', 'this file permanently', [
        {text: 'Cancel'},
        {
          text: 'OK',
          onPress: async () => {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(item.file_id, token);
            response && setUpdate(!update);
          },
        },
      ]);
    } catch (error) {
      throw new Error('doDelete: ' + error.message);
    }
  };

  const getOwner = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await getUserById(item.user_id, token);
    setOwner(owner);
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

  const getLikes = async () => {
    const likes = await getFavouritesByFileId(item.file_id);
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
      await postFavourite(item.file_id, token);
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
      await deleteFavourite(item.file_id, token);
      setUserLikesIt(false);
      getLikes();
    } catch (error) {
      // note: you cannot like same file multiple times
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

  useEffect(() => {
    getOwner();
    loadAvatar();
    getLikes();
    getComments();
  }, [update]);

  return (
    <Card
      style={styles.card}
      mode="elevated"
      onPress={() => {
        navigation.navigate('Single', item);
      }}
    >
      <Card.Title
        title={item.title}
        subtitle={SubtitleContent}
        left={LeftContent}
        right={rightContent}
      />
      <Card.Cover source={{uri: uploadsUrl + item.thumbnails?.w160}} />
      <Card.Content>
        <Text variant="titleMedium">{item.description}</Text>
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
          {new Date(item.time_added).toLocaleString('fi-FI')}
        </Text>
      </Card.Content>
    </Card>
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

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
