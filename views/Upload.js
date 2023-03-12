import {TextInput, Button} from 'react-native-paper';
import {Avatar, Accessory} from 'react-native-elements';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {Alert, Keyboard, ScrollView, Pressable, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useContext, useRef, useState} from 'react';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {appId, defaultUpload} from '../utils/variables';
import {Video} from 'expo-av';
import Tags from '../components/Tags';

const Upload = ({navigation}) => {
  const [mediafile, setMediafile] = useState({});
  const video = useRef(null);
  const [loading, setLoading] = useState(false);
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);
  const {advertTag} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger,
  } = useForm({
    defaultValues: {title: '', description: ''},
    mode: 'onChange',
  });

  const uploadFile = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const filename = mediafile.uri.split('/').pop();
    let fileExt = filename.split('.').pop();
    if (fileExt === 'jpg') fileExt = 'jpeg';
    const mimeType = mediafile.type + '/' + fileExt;
    formData.append('file', {
      uri: mediafile.uri,
      name: filename,
      type: mimeType,
    });
    console.log('form data', formData);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postMedia(formData, token);

      const appTag = {
        file_id: result.file_id,
        tag: appId,
      };
      const tagResult = await postTag(appTag, token);
      console.log('tag result', tagResult);

      const tagAdvert = await postTag(
        {file_id: result.file_id, tag: `${appId}_advert_${advertTag}`},
        token
      );
      console.log('tag advert result', tagAdvert);

      Alert.alert('Uploaded', 'File id: ' + result.file_id, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            // update 'update' state in context
            setUpdate(!update);
            // reset form
            // reset();
            // TODO: navigate to home
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('file upload failed', error);
    } finally {
      setLoading(false);
    }
  };

  const pickFile = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      console.log(result);

      if (!result.canceled) {
        setMediafile(result.assets[0]);
        // validate form
        trigger();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <Pressable onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          {mediafile.type === 'video' ? (
            <Video
              ref={video}
              source={{uri: mediafile.uri}}
              style={{width: '100%', height: 200}}
              resizeMode="cover"
              useNativeControls
              onError={(error) => {
                console.log(error);
              }}
            />
          ) : (
            <Avatar
              source={{
                uri: mediafile.uri || defaultUpload,
              }}
              rounded
              avatarStyle={{
                borderWidth: 5,
                borderBottomLeftRadius: 75,
                borderBottomRightRadius: 75,
                borderTopRightRadius: 75,
                borderTopLeftRadius: 75,
                borderColor: 'orange',
              }}
              titleStyle={{}}
              size={150}
              onPress={pickFile}
            >
              <Accessory size={20} />
            </Avatar>
          )}
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'white',
            height: '100%',
            padding: 20,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'is required',
              },
              minLength: {
                value: 3,
                message: 'Title min length is 3 characters.',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                mode="outlined"
                label="What are you giving away?"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{width: '100%'}}
                errorMessage={errors.title && errors.title.message}
              />
            )}
            name="title"
          />
          <Controller
            control={control}
            rules={{
              minLength: {
                value: 5,
                message: 'Description min length is 5 characters.',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                editable
                multiline
                mode="outlined"
                label="Describe the item you're giving away."
                numberOfLines={10}
                maxLength={40}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  width: '100%',
                  marginTop: '10%',
                }}
                errorMessage={errors.description && errors.description.message}
              />
            )}
            name="description"
          />
          <Tags></Tags>
          <Button
            loading={loading}
            disabled={!mediafile.uri || errors.title || errors.description}
            style={{width: '90%', marginBottom: '10%', marginTop: '10%'}}
            mode="contained"
            onPress={handleSubmit(uploadFile)}
          >
            Upload advertisment
          </Button>
        </View>
      </Pressable>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
