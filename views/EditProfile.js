import {Card} from '@rneui/themed';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {Alert, Keyboard, ScrollView, TouchableOpacity} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {Button} from 'react-native-paper';
import {Input} from 'react-native-elements';

const EditProfile = ({navigation}) => {
  const [loading] = useState(false);
  const {putUser, checkUsername} = useUser();
  const {user, setUser} = useContext(MainContext);

  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const modifyUser = async (data) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      delete data.confirmPassword;
      if (data.password === '') {
        delete data.password;
      }
      const result = await putUser(data, token);
      // setUser(data);
      console.log('User data', data);
      if (result) {
        Alert.alert('User details saved', result.message, [
          {
            text: 'OK',
            onPress: () => {
              // setUpdate(!update);
              navigation.navigate('Profile');
            },
          },
        ]);
        setUser(data);
      }
    } catch (error) {
      console.error('User modify failed', error);
    }
  };
  const checkUser = async (username, data) => {
    try {
      if (username != user.username) {
        const userAvailable = await checkUsername(username);
        console.log('checkUser', userAvailable);
        return userAvailable || 'Username is already taken';
      }
    } catch (error) {
      console.log('checkUser', error.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <Card>
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'This is required.'},
              minLength: {
                value: 3,
                message: 'Username min length is 3 characters',
              },
              validate: checkUser,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                errorMessage={errors.username && errors.username.message}
              />
            )}
            name="username"
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'email is required',
              },
              pattern: {
                value: /^[a-z0-9.]{1,64}@[a-z0-9.-]{3,64}/i,
                message: 'Must be a valid email',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                errorMessage={errors.email && errors.email.message}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              pattern: {
                value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
                message:
                  'min 5 characters, needs one number, one uppercase letter',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                errorMessage={errors.password && errors.password.message}
              />
            )}
            name="password"
          />
          <Controller
            control={control}
            rules={{
              validate: (value) => {
                if (value === getValues('password')) {
                  return true;
                } else {
                  return 'passwords must match';
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Confirm password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                errorMessage={
                  errors.confirmPassword && errors.confirmPassword.message
                }
              />
            )}
            name="confirmPassword"
          />
          <Button
            loading={loading}
            mode="contained"
            onPress={handleSubmit(modifyUser)}
          >
            Save
          </Button>
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

EditProfile.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default EditProfile;
