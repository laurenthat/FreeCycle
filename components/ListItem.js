import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import { Avatar, Button, Card, Text} from 'react-native-paper';
import {Icon} from '@rneui/themed';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';

import {ButtonGroup} from '@rneui/base';
import {useContext, useState, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia, useUser, useFavourite, useComment} from '../hooks/ApiHooks';

const ListItem = ({singleMedia, navigation}) => {
  const {user, setUpdate, update} = useContext(MainContext);
  const {deleteMedia} = useMedia();
  const item = singleMedia;
  // console.log(item);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [userLikesIt, setUserLikesIt] = useState(false);
  const {getFavouritesByFileId, postFavourite, deleteFavourite} = useFavourite();
  const {getCommentsByFileId} = useComment();
  
  const [owner, setOwner] = useState({});
  const {getUserById} = useUser();
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const SubtitleContent = '@' + owner.username;

  const getOwner = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await getUserById(item.user_id, token);
    // console.log("getOwner in listItem", owner);
    setOwner(owner);
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

  const commentFile = () => {
    navigation.navigate('Comments', item.file_id)
  }

  const getComments = async () => {
    try {
      const comments = await getCommentsByFileId(item.file_id);
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOwner();
    getLikes();
    getComments();
  }, []);

  // const doDelete = () => {
  //   try {
  //     Alert.alert('Delete', 'this file permanently', [
  //       {text: 'Cancel'},
  //       {
  //         text: 'OK',
  //         onPress: async () => {
  //           const token = await AsyncStorage.getItem('userToken');
  //           const response = await deleteMedia(item.file_id, token);
  //           response && setUpdate(!update);
  //         }
  //       }
  //     ])
  //   } catch (error) {
  //     throw new Error('doDelete: ' + error.message);
  //   }
  // }

  return (
    <Card style={styles.card}
      mode='elevated'
      onPress={() => {
        navigation.navigate('Single', item);
      }}
    >
    <Card.Title 
      title={item.title} 
      subtitle={SubtitleContent}
      left={LeftContent} />
    <Card.Cover style={styles.image} 
      source={{uri: uploadsUrl + item.thumbnails?.w160}} />
    <Card.Content>
      <Text variant="titleMedium">{item.description}</Text>
    </Card.Content>
    <Card.Actions style={styles.icon}>
      {userLikesIt ? (
        <Icon name="favorite" color="red" onPress={dislikeFile} />      
      ) : (
        <Icon name="favorite-border" onPress={likeFile} />
      )}
      <Text>{likes.length}</Text>
      <Icon name="chat-bubble-outline" onPress={commentFile} />
      <Text>{comments.length}</Text>
      <Icon name="bookmark-outline" />
    </Card.Actions>
    <Card.Content>
      <Text variant="bodyMedium">{new Date(item.time_added).toLocaleString('fi-FI')}</Text>
    </Card.Content>
  </Card>
    
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    marginHorizontal:10,
    // display: 'flex',
    // flexDirection: 'row',
  },
  image: {
    // paddingHorizontal: 10,
  },
  icon: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // paddingRight: 220,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;