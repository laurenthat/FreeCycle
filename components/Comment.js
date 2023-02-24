import React from 'react';
import {StyleSheet} from 'react-native';
// import {Avatar, ListItem as RNEListItem} from '@rneui/themed';
import {Avatar, ListItem, Text} from '@rneui/themed';
// import { ListItem, Avatar, Text } from '@rneui/themed';
// import { List } from 'react-native-paper';
// import {useContext, useState, useEffect} from 'react';
// import {useComment} from '../hooks/ApiHooks';
import {useState, useEffect} from 'react';
import {useComment, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const Comment = ({single}) => {
    const item = single;
    const [comments, setComments] = useState([]);
    const {getCommentsByFileId} = useComment();
    const [owner, setOwner] = useState({});
    const {getUserById} = useUser();
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
  }
  
  useEffect(() => {
    getOwner();
    getComments();
  }, []);
    

  return (
    <>
      <ListItem bottomDivider>
      <Avatar
        rounded
        source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
      />
      <ListItem.Content style={styles.allContent}>
        <ListItem.Content style={styles.firstRow}>
            <ListItem.Title style={styles.title}>{usernameContent}</ListItem.Title>
            <Text style={styles.date}>{new Date(item.time_added).toLocaleString('fi-FI')}</Text>
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
      alignContent:'flex-start',
      justifyContent: 'space-between',
    },
    title: {
      flex: 1,
    },
    secondRow: {
      flex: 1,
    }
  });

Comment.propTypes = {
    single: PropTypes.object,
};

export default Comment;