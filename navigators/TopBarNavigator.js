import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MainContext} from '../contexts/MainContext';
import {
  Button,
  Card,
  Icon,
  ListItem,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
} from '@rneui/themed';
import List from '../components/List';
import PropTypes from 'prop-types';

const MyPosts = ({navigation}) => {
  return (
    <>
      <List navigation={navigation} myFilesOnly={true} />
    </>
  );
};
MyPosts.propTypes = {
  navigation: PropTypes.object,
};

const Likes = () => {
  return (
    <>
      <Text>My likes</Text>
    </>
  );
};

const Bookmarks = () => {
  return (
    <>
      <Text>My bookmarks</Text>
    </>
  );
};

const Tab = createMaterialTopTabNavigator();

const TopBarNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My posts" component={MyPosts} />
      <Tab.Screen name="Likes" component={Likes} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} />
    </Tab.Navigator>
  );
};

export default TopBarNavigator;
