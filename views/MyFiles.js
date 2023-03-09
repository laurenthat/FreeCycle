import List from '../components/List';
import PropTypes from 'prop-types';
import {Text} from 'react-native-paper';

const MyFiles = ({navigation}) => {
  // // return <List navigation={navigation} myFilesOnly={true} />;
  // return <List navigation={navigation} favouritesOnly={true} />;
  <Text>My Files</Text>

};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;
