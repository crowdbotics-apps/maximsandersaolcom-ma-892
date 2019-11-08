import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { Text } from 'react-native-ui-kitten';
import Share from 'react-native-share';

const inactiveLike = require('../../assets/likeInactive.png');
const activeLike = require('../../assets/like.png');
const share = require('../../assets/share.png');
const chat = require('../../assets/chat.png');

export default class SocialBar extends React.Component {
  typeMapping = {
    container: {},
    section: {},
    icon: {},
    label: {}
  };
  static data = {
    likes: 0,
    comments: 0,
    shares: 5
  };

  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes >= 0 ? this.props.likes : SocialBar.data.likes,
      comments: this.props.comments >= 0 ? this.props.comments : SocialBar.data.comments,
      shares: this.props.shares || SocialBar.data.shares,
      liked: this.props.isLiked || false,
    };
  }

  shareOnSocialMedia = async (title, content, url) => {
    const options = {
      title: `Feed - ${title}`,
      message: `Feed - ${content}`,
      url,
    };
    try {
      await Share.open(options);
    } catch (err) {
      console.log('err on sharing', err);
    }
  }

  onLikeButtonPressed = () => {
    this.props.addOrRemoveLike(this.props.feedId);
    // const defaultCount = SocialBar.data.likes;
    // this.setState(prevState => ({
    //   likes:
    //     this.state.likes === defaultCount ? this.state.likes + 1 : defaultCount,
    //   liked: !prevState.liked
    // }));
  };

  render() {
    const { container, section, label } = styles;
    // const { liked } = this.state;
    const {
      onCommentButtonPressed, feedId, comments, likes, isLiked
    } = this.props;
    return (
      <View style={container}>
        <TouchableOpacity onPress={this.onLikeButtonPressed} style={section}>
          <Image
            source={isLiked ? activeLike : inactiveLike}
            style={{ width: 25, height: 25 }}
            resizeMode="contain"
          />
          <Text category="p1" appearance="hint" style={label}>
            {likes === 0 ? ' ' : likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onCommentButtonPressed(feedId)} style={section}>
          <Image source={chat} style={{ width: 25, height: 25 }} resizeMode="contain" />
          <Text category="p4" appearance="hint" style={label}>
            {comments === 0 ? ' ' : comments}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.shareOnSocialMedia} style={section}>
          <Image source={share} style={{ width: 25, height: 25 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    height: 30
  },
  icon: {
    fontSize: 20
  },
  label: {
    marginLeft: 8,
    color: 'grey'
    //alignSelf: "flex-end"
  }
});