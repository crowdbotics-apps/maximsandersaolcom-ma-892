import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const RestContainer = ({
  startCount,
  upNext,
  restContainerStyleProp,
  secondsRest
}) => {
  const [red, setRed] = useState(0);
  const [blue, setBlue] = useState(0);
  const [green, setGreen] = useState(0);
  const [seconds, setSeconds] = useState(secondsRest);

  useInterval(() => {
    if (seconds > 0 && startCount) {
      setRed(red + 1);
      setGreen(green + 1);
      setBlue(blue + 1);
      setSeconds(seconds - 1);
    }
  }, 1000);

  return (
    <View style={{ width: '100%', paddingHorizontal: 10 }}>
      <View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#3180BD', '#6EC2FA']}
          style={[styles.elementsContainer, restContainerStyleProp]}
        >
          <View style={{ marginRight: 20 }}>
            <Text style={{ color: 'white', fontSize: 14 }}>Rest</Text>
          </View>
          <View>
            <Text style={{ color: 'white', fontSize: 14 }}>{`${seconds} seconds`}</Text>
          </View>
        </LinearGradient>
      </View>
      <View style={[styles.elementsContainer, restContainerStyleProp]}>
        <View style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 14, color: 'rgb(102, 102, 102)' }}>Up next</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, color: 'black' }}>{upNext || 'Nothing'}</Text>
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
    borderWidth: 1,
    width: '100%'
  }
});

function useInterval(callback, delay) {
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
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default RestContainer;
