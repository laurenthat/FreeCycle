import React from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import List from '../components/List';
import {PropTypes} from 'prop-types';
import SearchForm from '../components/SearchForm';

const Search = ({navigation, route, input}) => {
  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <SearchForm navigation={navigation} />
      <View>
        <Text style={styles.categoryText}>New</Text>
        <List
          navigation={navigation}
          horizontal={true}
          newOnly={true}
          route={route}
          input={input}
        />
      </View>
      <View>
        <Text style={styles.categoryText}>Popular</Text>
        <List
          navigation={navigation}
          horizontal={true}
          newOnly={true}
          route={route}
          input={input}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fdaa5e',
    marginLeft: 25,
    marginTop: 25,
    marginBottom: 10,
  },
});

Search.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  input: PropTypes.string,
};

export default Search;
