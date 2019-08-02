import React, { Component } from 'react';
import SearchablePaginatedList from '../../components/SearchablePaginatedList/SearchablePaginatedList';
import FeedItem from '../../components/FeedItem';

const logo = require('../../assets/logo.png');
const waterPicture = require('../../assets/water_picture.jpg');
const stuffedPicture = require('../../assets/stuffed-peppers.jpg');
const womanFitnessPicture = require('../../assets/woman-fitness-workout.jpeg');
const lauraTransformation = require('../../assets/before-and-after.png');
const cookingVideo = require('../../assets/video/Cooking.mp4');

const feeds = [
  {
    fullName: 'Demo user',
    time: '1 mounth ago',
    title: 'How Much Water Are You Consuming?',
    likes: 10,
    comments: 20,
    id: 1,
    image: waterPicture,
    profileImage: logo,
    video: false
  },
  {
    fullName: 'Maxim Fitnes',
    time: '2 mounth ago',
    title: 'Low Carb Stuffed Peppers',
    likes: 42,
    comments: 12,
    id: 2,
    image: stuffedPicture,
    profileImage: logo,
    video: false
  },
  {
    fullName: 'John Doe',
    time: '4 mounth ago',
    title: '10 Dynamic Stretches Before a Workout',
    likes: 33,
    comments: 7,
    id: 3,
    image: womanFitnessPicture,
    profileImage: logo,
    video: false
  },
  {
    fullName: 'Pera Peric',
    time: '8 mounth ago',
    title: 'How To Food Prep',
    likes: 2,
    comments: 6,
    id: 4,
    image: '',
    profileImage: logo,
    video: true,
    videoFile: cookingVideo
  },
  {
    fullName: 'Nick Peric',
    time: '8 mounth ago',
    title: "Laura's Transformation",
    likes: 97,
    comments: 41,
    id: 5,
    image: lauraTransformation,
    profileImage: logo,
    video: false
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
      image,
      profileImage,
      video,
      videoFile
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
      profileImage={profileImage}
      video={video}
      videoFile={videoFile}
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
