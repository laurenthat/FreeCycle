import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Keyboard,
  ScrollView,
  Pressable,
  View,
  StyleSheet,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useContext, useRef, useState} from 'react';
import {useMedia} from '../hooks/ApiHooks';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {TextInput, Button} from 'react-native-paper';
import {uploadsUrl} from '../utils/variables';

const EditPost = ({navigation, route}) => {
  const {file} = route.params;
  const video = useRef(null);
  const [loading, setLoading] = useState(false);
  const {putMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {title: file.title, description: file.description},
    mode: 'onChange',
  });

  const modifyFile = async (data) => {
    // create form data and post it
    setLoading(true);
    console.log('data', data);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await putMedia(file.file_id, data, token);

      Alert.alert('Success', result.message, [
        {
          text: 'OK',
          onPress: () => {
            setUpdate(!update);
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('file modify failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <Pressable onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <View>
          {file.media_type === 'video' ? (
            <Video
              ref={video}
              source={{uri: uploadsUrl + file.filename}}
              style={{width: '100%', height: 200}}
              resizeMode="cover"
              useNativeControls
              onError={(error) => {
                console.log(error);
              }}
            />
          ) : (
            <Card>
              <Card.Cover
                source={{
                  uri: uploadsUrl + file.filename,
                }}
              />
            </Card>
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
                mode="outlined"
                label="Describe the item you're giving away."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{width: '100%', marginTop: '10%'}}
                multiline="true"
                numberOfLines={10}
                errorMessage={errors.description && errors.description.message}
              />
            )}
            name="description"
          />
          <Button
            // disabled={!file.uri || errors.title || errors.description}
            style={styles.button}
            onPress={handleSubmit(modifyFile)}
            loading={loading}
            mode="contained"
          >
            Edit advertisement
          </Button>
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  button: {
    width: 200,
    marginTop: '10%',
  },
});

EditPost.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default EditPost;
