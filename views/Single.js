import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-paper';
import PropTypes from 'prop-types';
import {Image} from '@rneui/base';
import {Video} from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import {uploadsUrl} from '../utils/variables';
import ListItem from '../components/ListItem';

const Single = ({navigation, route}) => {
  const video = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    unlock();

    const orientSub = ScreenOrientation.addOrientationChangeListener((evt) => {
      if (evt.orientationInfo.orientation > 2) {
        // show video in fullscreen
        if (video.current) showVideoInFullScreen();
      }
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub);
      lock();
    };
  }, []);

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="position">
      <ScrollView>
        <ListItem
          route={route}
          navigation={navigation}
          singleMedia={route.params}
          {...(route.params.media_type === 'image' ? (
            <Card.Cover source={{uri: uploadsUrl + route.params.filename}} />
          ) : (
            <Video
              ref={video}
              source={{uri: uploadsUrl + route.params.filename}}
              style={{width: '100%', height: 200}}
              resizeMode="cover"
              useNativeControls
              onError={(error) => {
                console.log(error);
              }}
              isLooping
            />
          ))}
        />
        <Card style={styles.card}>
          <Card.Content>
            <CommentForm
              style={styles.commentForm}
              navigation={navigation}
              route={route}
            />
          </Card.Content>
          <Card.Content style={{flexGrow: 1}}>
            <CommentList route={route} navigation={navigation} />
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
          source={{uri: uploadsUrl + route.params.filename}}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    marginHorizontal: 10,
  },
});

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
