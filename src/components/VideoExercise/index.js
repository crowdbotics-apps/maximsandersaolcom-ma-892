import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const VideoExercise = ({ videoUrl, containterStyle }) => (
  <View style={[styles.videoContainer, containterStyle]}>
    <Video
      source={{ uri: videoUrl }}
      paused
      controls
      style={styles.videoStyle}
    />
  </View>
);

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  videoStyle: { height: 200, width: '100%' }
});

export default VideoExercise;
