import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Video from 'react-native-video';
import PropTypes from 'prop-types';

const FeedItem = ({
  fullName = 'Stefan Bakmaz',
  time = '2 mounth ago',
  title = 'Test title',
  likes = 10,
  comments = 20,
  image = '',
  profileImage = '',
  id = 1,
  index = 1,
  video = false,
  videoFile = ''
}) => (
  <TouchableOpacity
    style={styles.container}
    key={index}
    onPress={() => console.log('id pressed', id)}
  >
    <View style={styles.headerWrapper}>
      <Image
        source={profileImage === '' ? { uri: 'https://picsum.photos/100/100' } : profileImage}
        style={profileImage === '' ? styles.profileImage : [styles.profileImage, { backgroundColor: 'white' }]}
        resizeMode="center"
      />
      <Text
        style={styles.fullNameLabel}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {`${fullName}  ·  ${time}`}
      </Text>
    </View>
    <View style={styles.imageWrapper}>
      {
        video
          ? (
            <Video
              source={videoFile}
              style={styles.image}
              repeat
              rate={1.0}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={image === '' ? { uri: 'https://picsum.photos/200/300' } : image}
              style={styles.image}
              resizeMode="cover"
            />
          )
      }
    </View>
    <View style={styles.bottomWrapper}>
      <View style={styles.title}>
        <Text style={styles.titleLable}>{title}</Text>
      </View>
      <View style={styles.likeAndComment}>
        <Text style={styles.likeAndCommentLabel}>{`${likes} Likes`}</Text>
        <Text style={styles.likeAndCommentLabel}>{`${comments} Comments`}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue'
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    flex: 1
  },
  image: {
    width: '100%',
    height: 200,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  fullNameLabel: {
    color: 'white',
    paddingLeft: 15
  },
  bottomWrapper: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  titleLable: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  likeAndComment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  likeAndCommentLabel: {
    color: 'gray'
  }
});

FeedItem.defaultProps = {
  fullName: '',
  time: '',
  title: '',
  likes: 10,
  comments: 20,
  id: 1,
  index: 1,
  image: '',
  profileImage: '',
  video: false,
  videoFile: '',
};

FeedItem.propTypes = {
  fullName: PropTypes.string,
  time: PropTypes.string,
  title: PropTypes.string,
  likes: PropTypes.number,
  comments: PropTypes.number,
  id: PropTypes.number,
  index: PropTypes.number,
  image: PropTypes.string,
  profileImage: PropTypes.string,
  video: PropTypes.bool,
  videoFile: PropTypes.string
};

export default FeedItem;
