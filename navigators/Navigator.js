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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => <Icon name="search" color={color} />,
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
        name="Notification"
        component={Notification}
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

// const Tabs = createBottomTabNavigator(
//   {
//     Profile: {
//       screen: Profile,
//       navigationOptions: {
//         title: 'Profile',
//         tabBarLabel: 'Profile',
//         tabBarIcon: ({tintColor}) => (
//           <Icon
//             name="ios-settings-outline"
//             type="ionicon"
//             size={33}
//             color={tintColor}
//           />
//         ),
//       },
//     },
//     Charities: {
//       screen: Upload,
//       navigationOptions: {
//         title: 'Browse',
//         tabBarLabel: 'Browse',
//         tabBarIcon: ({tintColor}) => (
//           <View
//             style={{
//               height: 80,
//               width: 80,
//               borderRadius: 100,
//               backgroundColor: '#FE6D64',
//               paddingTop: 15,
//             }}
//           >
//             <Icon
//               name="ios-heart-outline"
//               type="ionicon"
//               size={45}
//               color={tintColor}
//             />
//           </View>
//         ),
//       },
//     },
//     Account: {
//       screen: Home,
//       navigationOptions: {
//         title: 'Account',
//         tabBarLabel: 'Account',
//         tabBarIcon: ({tintColor}) => (
//           <Icon
//             name="connectdevelop"
//             type="font-awesome"
//             size={25}
//             color={tintColor}
//           />
//         ),
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: '#84E1BF',
//       inactiveTintColor: 'white',
//       labelStyle: {
//         fontSize: 12,
//       },
//       style: {
//         backgroundColor: '#283940',
//       },
//       showLabel: false,
//     },
//   }
// );

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

export default Navigator;
