import React, {useState} from 'react';

import {
  View, Text, SafeAreaView, StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Question from '../../components/Survey/Question';
import SurveyInput from "../../components/Survey/SurveyInput";


const SurveyScreen = props => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
      <SafeAreaView style={{ flex: 1 }}>

        <View style={styles.header}>
          <View>
            <Text>Arrow</Text>
          </View>
          <View>
            <Text>Logo</Text>
          </View>
        </View>


        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{width: '100%', paddingHorizontal: 20, maxWidth: 350}}>
            <Text>What is your name?</Text>
            <SurveyInput
                placeholder='First'
                value={firstName}
                onChangeText={setFirstName}
            />
            <SurveyInput
                placeholder='Last'
                value={lastName}
                onChangeText={setLastName}
            />
          </View>

          {/*<Question/>*/}
        </View>

      </SafeAreaView>
      )

};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    width: '100%'
  },

});

export default withNavigation(SurveyScreen);
