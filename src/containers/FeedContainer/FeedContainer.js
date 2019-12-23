import React from 'react';
import SearchablePaginatedList from '../../components/SearchablePaginatedList/SearchablePaginatedList';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Text, withStyles, Avatar } from 'react-native-ui-kitten';
import moment from 'moment';

import SocialBar from '../../components/socialBar';
import { data } from '../../data';

const avatarIcon = require('../../assets/avatarIcon.png');
const sendComment = require('../../assets/send_comment.png')


class _Feed extends React.Component {
  
  state = {
    comment: ''
  }

  extractItemKey = item => `${item.id}`;

  renderItem = ({ item }) => {
    return (
      <View style={this.props.themedStyle.card}>
        <View style={this.props.themedStyle.cardHeader}>
          <Avatar
            source={avatarIcon}
            size="small"
            style={this.props.themedStyle.avatar}
          />
          <View>
            <Text
              category="s1"
              style={this.props.themedStyle.text}
            >{`First and Last Name`}</Text>
            <Text
              category="c1"
              appearance="hint"
              style={this.props.themedStyle.textTime}
            >
              {moment(new Date(item.created_at))
                .fromNow()}
            </Text>
          </View>
        </View>
        <View style={this.props.themedStyle.cardImage}>
          <Image
            style={{ width: '100%', height: 200 }}
            source={{ uri: item.image_url }}
            resizeMode="cover"
          />
        </View>
        <View style={this.props.themedStyle.cardContent}>
          <Text category="s1" style={this.props.themedStyle.text}>
            {item.title}
          </Text>
          <Text category="p1" style={this.props.themedStyle.text}>
            {item.content}
          </Text>
        </View>
        <View style={this.props.themedStyle.cardBottom}>
          <SocialBar
            onCommentButtonPressed={this.props.toggleCommentAction}
            addOrRemoveLike={this.props.addOrRemoveLikeAction}
            feedId={item.id}
            likes={item.likes}
            isLiked={item.liked}
            comments={item.comments.length}
          />
        </View>
        {
          item.commentShow ? this.renderComments(item.comments) : null
        }
        {
          item.commentShow ? (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                flexDirection: 'row',
              }}
            >
              <View style={{ width: '80%' }}>
                <TextInput
                  placeholder="Write your comment"
                  onChangeText={value => this.setState({ [`comment${item.id}`]: value })}
                  style={{
                    backgroundColor: 'rgb(229,233,241)',
                    borderRadius: 10,
                    width: '100%',
                    maxHeight: 100,
                    padding: 10
                  }}
                  value={this.state[`comment${item.id}`]}
                  multiline
                />
              </View>
              <TouchableOpacity
                style={{ width: '10%', justifyContent: 'center', alignItems: 'center', height: 30 }}
                onPress={() => {
                  this.props.addCommentAction(item.id, this.state[`comment${item.id}`]);
                  this.setState({ [`comment${item.id}`]: '' });
                }}
              >
                <Image source={sendComment} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            </View>
          ) : null
        }
      </View>
    );
  };

  renderComments = comments => comments.map(comment => (
    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10, flexDirection: 'row', paddingHorizontal: 10 }}>
      <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{
            uri: comment.user.profile_url
          }}
          style={{ 
            width: 35,
            height: 35,
            borderRadius: 35 / 2
          }}
        />
      </View>
      <View style={{ backgroundColor: 'rgb(229,233,241)', width: '85%', borderRadius: 10, padding: 10 }}>
        <Text style={{ color: 'black' }}>{comment.content}</Text>
      </View>
    </View>
  ))

  render = () => (
    <SearchablePaginatedList
      style={this.props.themedStyle.container}
      contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 5, backgroundColor: 'rgb(229,233,241)' }}
      list={this.props.feeds}
      fetchListAction={(search, categorySlug, page, limit, offset) => this.props.getFeedAction({
        page,
        limit,
        offset
      })}
      renderItem={item => this.renderItem(item)}
      search={''}
      filter={''}
    />
  );
}

export default Feed = withStyles(_Feed, theme => ({
  container: {
    backgroundColor: theme["color-basic-400"],
    paddingVertical: 8,
    paddingHorizontal: 10,
    // marginTop: 20
  },
  card: {
    marginVertical: 8,
    backgroundColor: theme["color-basic-100"]
    //maxHeight: 520
  },
  cardHeader: {
    padding: 10,
    flexDirection: "row"
  },
  cardContent: {
    padding: 10
  },
  cardBottom: {
    padding: 10,
    width: "100%",
    Height: 100
  },
  avatar: {
    marginRight: 16
  },
  text: {
    color: theme["color-basic-1000"]
  },
  textTime: {
    color: theme["color-basic-600"]
    // marginTop: 5,
  },
  image: {
    width: "100%",
    // minHeight: 220,
    maxHeight: 220
  },
  cardImage: {
    maxHeight: 220,
  },

}));