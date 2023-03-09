import {FlatList, Text} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useMedia, useFavourite} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Like = ({navigation}) => {
  const [likes, setLikes] = useState([]);
  const {mediaArray} = useMedia();
  console.log('mediaArray', mediaArray);
  const {getFavouritesByUser} = useFavourite();

  const getLikes = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const likes = await getFavouritesByUser(token);
      setLikes(likes);
      console.log('likes frist', likes);
    } catch (error) {
      console.log(error);
    }
  };

  const mediaLikes = mediaArray.filter((item) =>
    likes.some((likeItem) => likeItem.file_id === item.file_id)
  );
  console.log('mediaLikes', mediaLikes);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <>
      <FlatList
        data={mediaLikes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ListItem navigation={navigation} singleMedia={item} />
        )}
      />
    </>
  );
};

Like.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Like;
