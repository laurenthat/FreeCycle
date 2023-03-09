import React, {useContext} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Login from '../views/Login';
import Upload from '../views/Upload';
import {MainContext} from '../contexts/MainContext';
import {Icon} from '@rneui/themed';
import MyFiles from '../views/MyFiles';
import Modify from '../views/Modify';
import Notification from '../views/Notification';
import Search from '../views/Search';
import {TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import EditProfile from '../views/EditProfile';
import Categories from '../views/Categories';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBarButton = ({onPress, children}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -25,
      justifyContent: 'center',
      ...styles.shadow,
    }}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 35,
        backgroundColor: '#fdaa5e',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: '#fdaa5e',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="Search and Categories"
        headerShown={false}
        component={Categories}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: () => <Icon name="add" size={50} color="white" />,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="notifications" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Single" component={Single} />
          <Stack.Screen name="MyFiles" component={MyFiles} />
          <Stack.Screen name="Modify" component={Modify} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Search" component={Search} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

Navigator.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.any,
};

export default Navigator;
