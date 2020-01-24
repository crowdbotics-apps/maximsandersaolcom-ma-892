import React, { useState } from 'react';

import {
  View, Text, SafeAreaView, Switch, ScrollView, KeyboardAvoidingView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Question from '../../components/Survey/Question';
import SurveyInput from '../../components/Survey/SurveyInput';
import SurveyButton from '../../components/Survey/SurveyButton';
import SurveyTerms from '../../components/Survey/SurveyTerms';
import SurveyHeader from '../../components/Survey/SurveyHeader';


const SurveyScreen = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [termsAgree, setTermsAgree] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <SurveyHeader
        onArrowPress={() => {
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative'
          }}
        >

          <View style={{ width: '100%', maxWidth: 320 }}>

            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 15 }}>What is your name?</Text>
            <View style={{ marginBottom: 35 }}>
              <SurveyInput
                placeholder="First"
                value={firstName}
                onChangeText={setFirstName}
              />
              <SurveyInput
                placeholder="Last"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ width: '40%' }}>
                <Switch
                  style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                  value={termsAgree}
                  onValueChange={value => setTermsAgree(value)}
                />
              </View>
              <View style={{ width: '60%' }}>
                <SurveyTerms />
              </View>
            </View>
          </View>


          {/* <Question/> */}


        </ScrollView>
        <SurveyButton
          onPress={() => {
          }}
          disabled={!firstName.length || !lastName.length || !termsAgree}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default withNavigation(SurveyScreen);
