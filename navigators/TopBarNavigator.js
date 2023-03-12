import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import List from '../components/List';
import PropTypes from 'prop-types';

const MyPosts = ({navigation, input, route}) => {
  console.log(route);
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

const Likes = ({navigation, route, input}) => {
  return <List navigation={navigation} route={route} input={input} />;
};
Likes.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  input: PropTypes.string,
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
