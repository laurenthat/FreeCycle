import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {PropTypes} from 'prop-types';
import List from '../components/List';
import {Searchbar} from 'react-native-paper';

const Search = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  console.log(route);

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Type here to search..."
        iconColor="#fdaa5e"
        placeholderTextColor="gray"
        elevation={0}
        inputStyle={styles.input}
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <List navigation={navigation} route={route} input={searchQuery} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Search.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  input: PropTypes.string,
};

export default Search;
