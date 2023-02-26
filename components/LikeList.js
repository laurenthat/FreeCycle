import { FlatList } from "react-native";
import { useMedia } from "../hooks/ApiHooks";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";

const List = ({ navigation, myFilesOnly = false, input}) => {
  const { update, setUpdate } = useContext(MainContext);
  const { mediaArray } = useMedia(myFilesOnly);
  const [fetching, setFetching] = useState(false);
  const unRefresh = () => {
    setUpdate(!update);
    setFetching(true);
  };
  useEffect(() => {
    setFetching(false);
  }, [mediaArray]);
  return (
    <FlatList
      refreshing={fetching}
      onRefresh={unRefresh}
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        if (
          input === "" ||
          item.title.toLowerCase().includes(input.toLowerCase()) ||
          item.description.toLowerCase().includes(input.toLowerCase())
        ) {
          return <ListItem navigation={navigation} singleMedia={item} />;
        }
      }}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
};

export default List;
