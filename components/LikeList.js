import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {useFavourite} from '../hooks/ApiHooks';
import {useMedia} from '../hooks/ApiHooks';
import Like from '../components/Like';
import {MainContext} from '../contexts/MainContext';

const LikeList = ({myFilesOnly, navigation}) => {
  const [favourites, setFavourites] = useState([]);
  const {update, setUpdate} = useContext(MainContext);
  const [fetching, setFetching] = useState(false);

  const {getFavouritesByFileId} = useFavourite();
  const {mediaArray} = useMedia(myFilesOnly);

  const unRefresh = () => {
    setUpdate(!update);
    setFetching(true);
  };

  const getFavourites = async () => {
    try {
      for (let i = 0; i < mediaArray.length; i++) {
        const favourites = await getFavouritesByFileId(mediaArray[i].file_id);
        setFavourites(favourites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavourites();
  }, [favourites]);

  return (
    <FlatList
      refreshing={fetching}
      onRefresh={unRefresh}
      data={favourites}
      renderItem={({item}) => (
        <Like navigation={navigation} singleMedia={item} />
      )}
    />
  );
};

LikeList.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default LikeList;
