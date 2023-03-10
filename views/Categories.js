import React from 'react';
import {StyleSheet, Text, ScrollView, View, RefreshControl} from 'react-native';
import List from '../components/List';
import {PropTypes} from 'prop-types';
import SearchForm from '../components/SearchForm';

const Search = ({navigation, route, input}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      stickyHeaderIndices={[0]}
    >
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
        <Text style={styles.categoryText}>Furniture</Text>
        <List
          navigation={navigation}
          horizontal={true}
          newOnly={true}
          furnitureOnly={true}
          route={route}
          input={input}
        />
      </View>
      <View>
        <Text style={styles.categoryText}>Electronics</Text>
        <List
          navigation={navigation}
          horizontal={true}
          newOnly={true}
          electronicsOnly={true}
          route={route}
          input={input}
        />
      </View>
      <View>
        <Text style={styles.categoryText}>Clothing</Text>
        <List
          navigation={navigation}
          horizontal={true}
          newOnly={true}
          clothingOnly={true}
          route={route}
          input={input}
        />
      </View>
      <View>
        <Text style={styles.categoryText}>Other</Text>
        <List
          navigation={navigation}
          horizontal={true}
          newOnly={true}
          otherOnly={true}
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
