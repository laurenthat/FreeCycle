import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from '@rneui/themed';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import List from '../components/List';
import PropTypes from 'prop-types';
import Like from '../components/Like';

const MyPosts = ({navigation, route, input}) => {
  return (
    <>
      <List
        navigation={navigation}
        route={route}
        input={input}
        myFilesOnly={true}
      />
    </>
  );
};
MyPosts.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  input: PropTypes.string,
};

const Likes = ({navigation}) => {
  return (
    <>
      <Like navigation={navigation} />
    </>
  );
};
Likes.propTypes = {
  navigation: PropTypes.object,
};

const Tab = createMaterialTopTabNavigator();

const TopBarNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarItemStyle: {borderColor: '#FDAA5E'},
        tabBarPressColor: '#FDAA5E',
        // tabBarStyle: {backgroundColor: 'powderblue'},
      }}
    >
      <Tab.Screen
        name="My posts"
        component={MyPosts}
        options={{tabBarLabel: 'My Posts'}}
      />
      <Tab.Screen
        name="Likes"
        component={Likes}
        options={{tabBarLabel: 'Likes'}}
      />
    </Tab.Navigator>
  );
};

export default TopBarNavigator;
