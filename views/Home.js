import {StyleSheet, SafeAreaView} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = ({navigation, route, input}) => {
  return (
    <SafeAreaView style={styles.container}>
      <List navigation={navigation} route={route} input={input}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  input: PropTypes.string,
};

export default Home;
