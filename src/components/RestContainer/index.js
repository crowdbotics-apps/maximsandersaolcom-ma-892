import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const RestContainer = ({
  startCount,
  upNext,
  restContainerStyleProp,
  secondsRest,
  stopCountFunc,
  activeSet,
  notMyTurn
}) => {
  const [seconds, setSeconds] = useState(activeSet.timer);
  const [intervalRef, setIntervalRef] = useState(null);

  useEffect(() => {
    if (!seconds) {
      setSeconds(activeSet.timer);
    }
  }, [secondsRest, startCount, activeSet]);

  useInterval(() => {
    if (seconds > 0 && startCount) {
      setSeconds(seconds - 1);
    } else {
      stopCountFunc(setSeconds);
      if (seconds === 0) {
        clearInterval(intervalRef);
      }
    }
  }, 1000, setIntervalRef, startCount);

  return (
    <View style={{ width: '100%', paddingHorizontal: 10 }}>
      <View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#3180BD', '#FCFBFE']}
          style={[styles.elementsContainer, restContainerStyleProp]}
        >
          <View style={{ marginRight: 20 }}>
            <Text style={{ color: 'white', fontSize: 14 }}>Rest</Text>
          </View>
          <View>
            <Text style={{ color: 'white', fontSize: 14 }}>{notMyTurn ? '-' : `${seconds} seconds`}</Text>
          </View>
        </LinearGradient>
      </View>
      <View style={[styles.elementsContainer, restContainerStyleProp]}>
        <View style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 14, color: 'rgb(102, 102, 102)' }}>Up next</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, color: 'black' }}>{upNext}</Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  elementsContainer: {
    marginTop: 1,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    width: '100%'
  }
});

function useInterval(callback, delay, setIntervalRef, startCount) {
  const savedCallback = useRef();
  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (startCount) {
      let id = setInterval(tick, delay);
      setIntervalRef(id);
      return () => clearInterval(id);
    }
  }, [startCount]);
}

export default RestContainer;
