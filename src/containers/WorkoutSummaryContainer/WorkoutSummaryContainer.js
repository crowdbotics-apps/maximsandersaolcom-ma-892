import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import {
  PieChart,
} from 'react-native-chart-kit';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Fonts from '../../assets/fonts';

const cancelIcon = require('../../assets/icon_cancel.png');
const defaultImage = require('../../assets/logoSplashScreen.png');

const { width } = Dimensions.get('window');

const chartConfig = {
  backgroundGradientFrom: '',
  backgroundGradientTo: '',
  color: (opacity = 1) => 'rgba(130, 212, 83)',
  strokeWidth: 2 // optional, default 3
};

const dataPie = [
  {
    name: 'Strength',
    population: 215,
    color: 'rgba(69, 161, 248)',
    legendFontColor: '#FFFFFF',
    legendFontSize: 16,
  },
  {
    name: 'Mobility',
    population: 100,
    color: 'rgba(130, 212, 83)',
    legendFontColor: '#FFFFFF',
    legendFontSize: 16
  },
  {
    name: 'Cardio',
    population: 180,
    color: 'rgba(240, 187, 65)',
    legendFontColor: '#FFFFFF',
    legendFontSize: 16
  },
];

const renderItem = item => (
  <TouchableOpacity
    style={styles.itemTouchable}
    disabled
  >
    <View
      style={styles.itemWrapper}
    >
      <View style={styles.imageItemWrapper}>
        <Image
          source={item.exercise.pictures[0] ? { uri: item.exercise.pictures[0].image_url } : defaultImage}
          style={{ width: 100, height: 70 }}
          resizeMode="center"
        />
      </View>
      <View style={styles.textItemWrapper}>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{ color: 'white', fontFamily: Fonts.HELVETICA_MEDIUM, fontSize: 15 }}
        >
          {item.exercise.name}
        </Text>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{ color: 'gray', fontFamily: Fonts.HELVETICA_MEDIUM, fontSize: 12 }}
        >
          Total reps: 44
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const WorkoutSummaryContainter = ({ navigation: { goBack }, allSessions }) => {
  // useEffect(() => {
  // use true data for display in last box
  // }, [allSessions]);
  const [getFirstSession] = allSessions;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.customHeaderBack}>
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}
            style={styles.button}
          >
            <Image
              source={cancelIcon}
              style={styles.image}
            />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Day 1</Text>
          </View>
          <View style={styles.empty} />
        </View>
        <View style={styles.subHeaderWrapper}>
          <View style={styles.subTitleWrapper}>
            <Text style={styles.subTitle}>Biceps, Triceps, Cardio</Text>
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.date}>{`Completed ${moment(new Date()).format('LLL')}`}</Text>
          </View>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1, paddingHorizontal: 15 }}
        >
          <View style={styles.firstBox}>
            <PieChart
              data={dataPie}
              width={width - 40}
              height={150}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              absolute={false}
            />
          </View>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={styles.secondBox}>
              <View style={styles.boxTitleWrapper}>
                <Text style={styles.boxText}>SETS COMPLETED</Text>
              </View>
              <View style={styles.graphAndTextWrapper}>
                <AnimatedCircularProgress
                  size={75}
                  width={10}
                  backgroundWidth={10}
                  rotation={0}
                  fill={100}
                  tintColor="#82D453"
                  backgroundColor="#EC3F25"
                >
                  {fill => <Text style={styles.points}>{`${Math.round((100 * fill) / 100)}%`}</Text>}
                </AnimatedCircularProgress>
                <View style={styles.textForGraphWrapper}>
                  <Text style={styles.textForGraph}>18 of expected</Text>
                  <Text style={styles.textForGraph}>18 sets</Text>
                </View>
              </View>
            </View>
            <View style={styles.thirdBox}>
              <View style={styles.boxTitleWrapper}>
                <Text style={styles.boxText}>CARDIO DETAILS</Text>
              </View>
              <View style={styles.graphAndTextWrapper}>
                <AnimatedCircularProgress
                  size={75}
                  width={10}
                  backgroundWidth={10}
                  rotation={0}
                  fill={30}
                  tintColor="#82D453"
                  backgroundColor="#EC3F25"
                >
                  {fill => <Text style={styles.points}>{`${Math.round((75 * fill) / 100)}%`}</Text>}
                </AnimatedCircularProgress>
                <View style={styles.textForGraphWrapper}>
                  <Text style={styles.textForGraph}>Duration - -</Text>
                  <Text style={styles.textForGraph}>Avg Heart Rate</Text>
                  <Text style={styles.textForGraph}>- - BPM</Text>
                  <Text style={styles.textForGraph}>Calories - - </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.lastBox}>
            {
              getFirstSession.workouts.map(item => renderItem(item))
            }
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(94,94,94);'
  },
  customHeaderBack: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row'
  },
  button: {
    width: '20%'
  },
  image: {
    width: 20,
    height: 20
  },
  empty: {
    width: '20%'
  },
  subHeaderWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 30
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
    paddingTop: 10
  },
  subTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dateWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },
  date: {
    fontSize: 16,
    fontFamily: Fonts.HELVETICA_BOLD,
    textAlign: 'center',
    color: 'white'
  },
  subTitle: {
    fontSize: 22,
    fontFamily: Fonts.HELVETICA_BOLD,
    textAlign: 'center',
    color: 'white'
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.HELVETICA_BOLD,
    textAlign: 'center',
    color: 'white'
  },
  firstBox: {
    width: '100%',
    height: 150,
    backgroundColor: 'rgb(214,213,213);',
    borderRadius: 5,
    marginBottom: 10
  },
  secondBox: {
    width: '49%',
    height: 150,
    backgroundColor: 'rgb(214,213,213);',
    borderRadius: 5,
  },
  thirdBox: {
    width: '49%',
    height: 150,
    backgroundColor: 'rgb(214,213,213);',
    borderRadius: 5,
  },
  boxText: {
    fontSize: 14,
    fontFamily: Fonts.HELVETICA_BOLD,
    color: 'white',
    textAlign: 'center',
  },
  points: {
    fontSize: 15,
    fontFamily: Fonts.HELVETICA_BOLD,
    color: '#82D453'
  },
  graphAndTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 110
  },
  textForGraphWrapper: {
    flexDirection: 'column'
  },
  textForGraph: {
    fontSize: 12,
    fontFamily: Fonts.HELVETICA_NORMAL,
    color: 'white',
    textAlign: 'left'
  },
  boxTitleWrapper: {
    marginTop: 15
  },
  lastBox: {
    backgroundColor: 'rgb(214,213,213);',
    borderRadius: 5,
    flexDirection: 'column',
  },
  itemTouchable: {
    width: '100%',
    height: 85
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
  },
  imageItemWrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  textItemWrapper: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 70
  },
  textItem: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: Fonts.HELVETICA_MEDIUM,
    marginTop: 15
  },
});

export default WorkoutSummaryContainter;
