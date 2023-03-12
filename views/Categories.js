import React from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import List from '../components/List';
import {PropTypes} from 'prop-types';
import SearchForm from '../components/SearchForm';

const Categories = ({navigation, route, input}) => {
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
        <Text style={styles.categoryText}>Furniture</Text>
        <List
          navigation={navigation}
          horizontal={true}
          furnitureOnly={true}
          newOnly={true}
          route={route}
          input={input}
        />
      </View>
      <View>
        <Text style={styles.categoryText}>Electronics</Text>
        <List
          navigation={navigation}
          horizontal={true}
          electronicsOnly={true}
          newOnly={true}
          route={route}
          input={input}
        />
      </View>
      <View>
        <Text style={styles.categoryText}>Clothing</Text>
        <List
          navigation={navigation}
          horizontal={true}
          clothingOnly={true}
          newOnly={true}
          route={route}
          input={input}
        />
      </View>
      <View>
        <Text style={styles.categoryText}>Other</Text>
        <List
          navigation={navigation}
          horizontal={true}
          otherOnly={true}
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

Categories.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  input: PropTypes.string,
};

export default Categories;
