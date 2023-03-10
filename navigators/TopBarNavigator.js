import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text} from '@rneui/themed';
import List from '../components/List';
import PropTypes from 'prop-types';

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

const Likes = () => {
  return (
    <>
      <Text>Likes</Text>
    </>
  );
};
Likes.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  input: PropTypes.string,
};

const Tab = createMaterialTopTabNavigator();

const TopBarNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My posts" component={MyPosts} />
      <Tab.Screen name="Likes" component={Likes} />
    </Tab.Navigator>
  );
};

export default TopBarNavigator;
