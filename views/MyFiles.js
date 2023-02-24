import List from '../components/List';
import PropTypes from 'prop-types';

const MyFiles = ({navigation}) => {
  return (
    <List input={""} navigation={navigation} myFilesOnly={true} />
  )
}

MyFiles.propTypes = {
    navigation: PropTypes.object,
  };

export default MyFiles;
