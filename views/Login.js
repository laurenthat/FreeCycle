import React, {useContext, useEffect, useState} from 'react';
import {
  Platform,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Text} from '@rneui/themed';
import {Button} from 'react-native-paper';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const [toggleForm, setToggleForm] = useState(true);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      // if no token available, do nothing
      if (userToken === null) return;
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('checkToken', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <ScrollView>
      <Pressable onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {toggleForm ? <LoginForm /> : <RegisterForm />}
          <Text style={styles.text}>
            {toggleForm
              ? 'No account yet? Please register.'
              : 'Already have an account? Please login.'}
          </Text>
          <Button
            style={styles.button}
            mode="contained"
            buttonColor="#fdaa5e"
            title={toggleForm ? 'Register' : 'Login'}
            onPress={() => {
              setToggleForm(!toggleForm);
            }}
          >
            {toggleForm ? 'Register' : 'Login'}
          </Button>
        </KeyboardAvoidingView>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    width: '90%',
    marginBottom: '10%',
    marginTop: '10%',
    alignSelf: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
