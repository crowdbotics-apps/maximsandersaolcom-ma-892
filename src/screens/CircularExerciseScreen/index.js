import React from 'react';
import {useSelector} from 'react-redux';
import {View, Animated, Text, Image} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import VideoExercise from '../../components/VideoExercise';
import ProgressBar from 'react-native-progress/Bar';

const logoImage = require('../../assets/logoSplashScreen.png');

const CircularExerciseScreen = () => {
  const selectedSession = useSelector(state => state.sessions.selectedSession);
  const exercisesObj = useSelector(state => state.sessions?.exercisesObj);
  const {exercise, timer} = exercisesObj;
  const {video_url, name} = exercise || {};

  const next_exercise = useSelector(
    state => state.sessions?.nextWorkout?.exercise?.exercise_type?.name,
  );
  if (!exercise) return <Text>Loading...</Text>;
  return (
    <View>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>
      <View>
        <VideoExercise containterStyle={styles.video} videoUrl={video_url} />
      </View>
      <View style={styles.content}>
        <Text style={styles.circuit}>Circuit 1/3</Text>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View style={styles.countDown}>
            <CountdownCircleTimer
              size={200}
              strokeWidth={6}
              isPlaying
              duration={timer}
              colors="cornflowerblue">
              {({remainingTime}) => (
                <Animated.Text style={styles.animatedText}>
                  {remainingTime}
                </Animated.Text>
              )}
            </CountdownCircleTimer>
            <View style={styles.nextButton}>
              <Text>Next</Text>
            </View>
          </View>
          <Text style={styles.exerciseName}>{name}</Text>
          <Text style={styles.nextExerciseName}>Next: {next_exercise}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={styles.progressBarWrapper}>
            <ProgressBar
              borderWidth={0}
              unfilledColor="#dedede"
              progress={0.35}
              color="cornflowerblue"
              width={null}
            />
          </View>
          <Text style={sessionLength}>1/{selectedSession.length}</Text>
        </View>
      </View>
    </View>
  );
};

export default CircularExerciseScreen;

const styles = StyleSheet.create({
  logoContainer: {height: 100, width: '100%', backgroundColor: 'grey'},
  logo: {width: 300, height: 100},
  video: {paddingHorizontal: 0, marginTop: 0},
  content: {
    padding: 10,
  },
  circuit: {fontWeight: '900', fontSize: 12},
  animatedText: {color: '#000', fontSize: 50},
  nextButton: {position: 'absolute', top: '50%', right: 0},
  exerciseName: {
    fontSize: 25,
    color: 'cornflowerblue',
    fontWeight: '900',
    marginTop: 30,
  },
  nextExerciseName: {marginTop: 10},
  progressBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  progressBarWrapper: {width: '90%'},
  sessionLength: {marginLeft: 10, fontWeight: '600'},
  countDown: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
});
