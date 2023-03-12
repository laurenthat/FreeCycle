import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Comment from '../components/Comment';
import {useComment} from '../hooks/ApiHooks';
import {useMedia} from '../hooks/ApiHooks';
import {SectionList, Text, StyleSheet} from 'react-native';
import moment from 'moment';

const CommentList = ({route, myFilesOnly, navigation}) => {
  const [comments, setComments] = useState([]);
  const [notificationComments, setNotificationComments] = useState([]);
  const {getCommentsByFileId} = useComment();
  const {mediaArray} = useMedia(myFilesOnly);
  const routeName = route.name;

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

    const data = [
      {
        title: 'Today',
        data: todayComments,
      },
      {
        title: 'Yesterday',
        data: yesterdayComments,
      },
      {
        title: 'Earlier',
        data: earlierComments,
      },
    ];

    if (routeName === 'Notifications') {
      if (
        todayComments.length === 0 &&
        yesterdayComments.length === 0 &&
        earlierComments.length === 0
      ) {
        return (
          <Text style={styles.noCommentsText}>
            No new comments left on your posts yet...
          </Text>
        );
      } else {
        return (
          <SectionList
            sections={data}
            renderItem={({item}) => (
              <Comment
                navigation={navigation}
                single={item}
                route={route}
                myFilesOnly={myFilesOnly}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            renderSectionHeader={({section}) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
          />
        );
      }
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
  }, [mediaArray]);

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
    color: '#fdaa5e',
  },
});

CommentList.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default CommentList;
