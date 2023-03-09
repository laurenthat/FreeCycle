import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const SearchForm = ({navigation}) => {
  return (
    <Button
      style={styles.button}
      icon="magnify"
      mode="contained"
      buttonColor="#fdaa5e"
      onPress={() => {
        navigation.navigate('Search');
      }}
    >
      Search
    </Button>
  );
};

SearchForm.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 10,
  },
});

export default SearchForm;
