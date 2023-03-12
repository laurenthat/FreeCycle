import React from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFavourite} from '../hooks/ApiHooks';

const List = ({
  navigation,
  myFilesOnly = false,
  horizontal = false,
  newOnly = false,
  furnitureOnly = false,
  electronicsOnly = false,
  clothingOnly = false,
  otherOnly = false,
  input,
  route,
}) => {
  const {mediaArray} = useMedia(
    myFilesOnly,
    furnitureOnly,
    electronicsOnly,
    clothingOnly,
    otherOnly
  );
  const routeName = route.name;

  const [likes, setLikes] = useState([]);
  const {getFavouritesByUser} = useFavourite();

  const getLikedPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const likes = await getFavouritesByUser(token);
      setLikes(likes);
    } catch (error) {
      console.log(error);
    }
  };

  const mediaToShow = () => {
    if (routeName === 'Likes') {
      return mediaArray.filter((item) =>
        likes.some((likeItem) => likeItem.file_id === item.file_id)
      );
    } else {
      return mediaArray;
    }
  };

  useEffect(() => {
    getLikedPosts();
  }, [likes]);

  return (
    <FlatList
      data={newOnly ? mediaToShow().slice(0, 10) : mediaToShow()}
      maxToRenderPerBatch={5}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      horizontal={horizontal}
      renderItem={({item}) => {
        if (routeName === 'Search') {
          if (input.length === 0) {
            return null;
          } else if (
            item.title.toLowerCase().includes(input.toLowerCase()) ||
            item.description.toLowerCase().includes(input.toLowerCase())
          ) {
            return (
              <ListItem
                route={route}
                navigation={navigation}
                singleMedia={item}
              />
            );
          }
        } else {
          return (
            <ListItem
              route={route}
              navigation={navigation}
              singleMedia={item}
            />
          );
        }
      }}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
  horizontal: PropTypes.bool,
  newOnly: PropTypes.bool,
  input: PropTypes.string,
  route: PropTypes.object,
  furnitureOnly: PropTypes.bool,
  electronicsOnly: PropTypes.bool,
  clothingOnly: PropTypes.bool,
  otherOnly: PropTypes.bool,
};

export default List;
