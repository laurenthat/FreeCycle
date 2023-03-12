import React, {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication} from '../hooks/ApiHooks';
import {Controller, useForm} from 'react-hook-form';
import {Input} from '@rneui/themed';
import {Button, Card} from 'react-native-paper';

const LoginForm = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: ''},
  });

  const logIn = async (loginData) => {
    console.log('Login button pressed', loginData);
    // const data = {username: 'yingzh', password: 'asdfg'};
    try {
      const loginResult = await postLogin(loginData);
      console.log('login', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.warn('logIn', error);
      // TODO: notify user about failed login attempt
    }
  };

  return (
    <Card style={{margin: 10}}>
      <Card.Title>Login Form</Card.Title>
      <Controller
        control={control}
        rules={{required: {value: true, message: 'is required'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.username && errors.username.message}
            autoCapitalize="none"
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'password is required',
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
      <Button
        title="Log in!"
        style={{
          width: '90%',
          marginBottom: '10%',
          marginTop: '10%',
          alignSelf: 'center',
        }}
        mode="contained"
        buttonColor="#fdaa5e"
        onPress={handleSubmit(logIn)}
      >
        Login
      </Button>
    </Card>
  );
};

export default LoginForm;
