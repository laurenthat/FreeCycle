import * as React from 'react';
import { Platform, StyleSheet, SafeAreaView } from "react-native";
import List from "../components/List";
import PropTypes from "prop-types";
import { Searchbar } from 'react-native-paper';

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <List input={searchQuery} setInput={setSearchQuery} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
