import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Comment from '../components/Comment';
import {useComment} from '../hooks/ApiHooks';
import {useMedia} from '../hooks/ApiHooks';
import {SectionList, Text, StyleSheet, RefreshControl} from 'react-native';
import moment from 'moment';

const CommentList = ({route, myFilesOnly, navigation}) => {
  const [comments, setComments] = useState([]);
  const [notificationComments, setNotificationComments] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const {getCommentsByFileId} = useComment();
  const {mediaArray} = useMedia(myFilesOnly);
  const routeName = route.name;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getComments = async () => {
    if (routeName === 'Notifications') {
      try {
        for (let i = 0; i < mediaArray.length; i++) {
          const notificationComments = await getCommentsByFileId(
            mediaArray[i].file_id
          );
          setNotificationComments(notificationComments);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const {file_id: fileId} = route.params;
        const comments = await getCommentsByFileId(fileId);
        setComments(comments);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showComments = () => {
    const todayComments = notificationComments.filter(
      (item) =>
        moment(item.time_added).format('M D YYYY') ===
        moment().format('M D YYYY')
    );
    const yesterdayComments = notificationComments.filter(
      (item) =>
        moment(item.time_added).format('M D YYYY') ===
        moment().subtract(1, 'days').format('M D YYYY')
    );
    const earlierComments = notificationComments.filter(
      (item) =>
        moment(item.time_added).format('M D YYYY') !==
          moment().format('M D YYYY') &&
        moment(item.time_added).format('M D YYYY') !==
          moment().subtract(1, 'days').format('M D YYYY')
    );

    if (routeName === 'Notifications') {
      return (
        <SectionList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          sections={[
            {
              title: 'Today',
              data: todayComments.map((item) => item),
            },
            {
              title: 'Yesterday',
              data: yesterdayComments.map((item) => item),
            },
            {
              title: 'Earlier',
              data: earlierComments.map((item) => item),
            },
          ]}
          renderItem={({item}) => (
            <Comment
              navigation={navigation}
              single={item}
              route={route}
              myFilesOnly={myFilesOnly}
              onPress={() => {
                navigation.navigate('Single', {
                  file_id: item.file_id,
                });
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
        />
      );
    } else {
      return (
        <>
          {comments
            .slice(0)
            .reverse()
            .map((comment, index) => (
              <Comment
                key={index}
                single={comment}
                route={route}
                navigation={navigation}
                myFilesOnly={myFilesOnly}
              />
            ))}
        </>
      );
    }
  };

  useEffect(() => {
    getComments();
    showComments();
  }, [comments, notificationComments, mediaArray]);

  return showComments();
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#fdaa5e',
  },
  noCommentsText: {
    fontSize: 15,
  },
});

CommentList.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default CommentList;
