import React, {useContext} from 'react';
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
import Notifications from '../views/Notifications';
import Comments from '../views/Comments';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
    return (      
      <Tab.Navigator >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({color}) => <Icon name="cloud-upload" color={color} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({color}) => <Icon name="notifications" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => <Icon name="person" color={color} />,
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
            options={{headerShown:  false}}
          />
          <Stack.Screen name="Single" component={Single} /> 
          <Stack.Screen name="MyFiles" component={MyFiles} />
          <Stack.Screen name="Modify" component={Modify} />
          <Stack.Screen name="Comments" component={Comments} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
      ) }   
    </Stack.Navigator>
    )
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;