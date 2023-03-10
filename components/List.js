import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFavourite} from '../hooks/ApiHooks';

const List = ({
  navigation,
  myFilesOnly = false,
  horizontal = false,
  newOnly = false,
  favouritesOnly = false,
  furnitureOnly = false,
  electronicsOnly = false,
  clothingOnly = false,
  otherOnly = false,
  input,
  route,
}) => {
  const {mediaArray} = useMedia(
    myFilesOnly,
    favouritesOnly,
    furnitureOnly,
    electronicsOnly,
    clothingOnly,
    otherOnly
  );

  const {update, setUpdate} = useContext(MainContext);
  const [fetching, setFetching] = useState(false);
  const routeName = route.name;

  const [likes, setLikes] = useState([]);
  const {getFavouritesByUser} = useFavourite();

  const getLikes = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const likes = await getFavouritesByUser(token);
      setLikes(likes);
      // console.log('likes', likes);
    } catch (error) {
      console.log(error);
    }
  };

  const mediaToShow = () => {
    if (routeName === 'Likes') {
      return mediaArray.filter((item) => item.file_id === likes.file_id);
    } else {
      return mediaArray;
    }
  };

  const unRefresh = () => {
    setUpdate(!update);
    setFetching(true);
  };

  useEffect(() => {
    setFetching(false);
    getLikes();
  }, [mediaArray, likes]);

  return (
    <FlatList
      refreshing={fetching}
      onRefresh={unRefresh}
      data={newOnly ? mediaToShow().slice(0, 10) : mediaToShow()}
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
  favouritesOnly: PropTypes.bool,
  input: PropTypes.string,
  route: PropTypes.object,
  furnitureOnly: PropTypes.bool,
  electronicsOnly: PropTypes.bool,
  clothingOnly: PropTypes.bool,
  otherOnly: PropTypes.bool,
};

export default List;
