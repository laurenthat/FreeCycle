import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from '@rneui/themed';
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
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="Likes"
        component={Likes}
        options={{tabBarLabel: 'Likes'}}
      />
      <Tab.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{tabBarLabel: 'Bookmarks'}}
      />
    </Tab.Navigator>
  );
};

export default TopBarNavigator;
