import React, { Component } from 'react';
import SearchablePaginatedList from '../../components/SearchablePaginatedList/SearchablePaginatedList';
import FeedItem from '../../components/FeedItem';

const logo = require('../../assets/logo.png');

const feeds = [
  {
    fullName: 'Test user',
    time: '1 mounth ago',
    title: 'Exaple test',
    likes: 10,
    comments: 20,
    id: 1,
    image: ''
  },
  {
    fullName: 'Maxim Fitnes',
    time: '2 mounth ago',
    title: 'My feed',
    likes: 42,
    comments: 12,
    id: 2,
    image: logo
  },
  {
    fullName: 'John Doe',
    time: '4 mounth ago',
    title: 'This is my first, mock data',
    likes: 33,
    comments: 7,
    id: 3,
    image: ''
  },
  {
    fullName: 'Pera Peric',
    time: '8 mounth ago',
    title: 'I will make whatever you want',
    likes: 2,
    comments: 6,
    id: 4,
    image: ''
  },
];

export default class FeedContainer extends Component {
  renderItem = ({
    item: {
      fullName,
      time,
      title,
      likes,
      comments,
      id,
      image
    },
    index
  }) => (
    <FeedItem
      fullName={fullName}
      time={time}
      title={title}
      likes={likes}
      comments={comments}
      image={image}
      id={id}
      index={index}
    />
  );

  render() {
    return (
      <SearchablePaginatedList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 0, paddingVertical: 0 }}
        list={feeds}
        fetchListAction={() => {}}
        renderItem={item => this.renderItem(item)}
        search={''}
        filter={''}
      />
    );
  }
}
