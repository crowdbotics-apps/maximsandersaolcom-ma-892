import React, {useState} from 'react';

import {
  View, Text, SafeAreaView, StyleSheet, Switch, TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Question from '../../components/Survey/Question';
import SurveyInput from "../../components/Survey/SurveyInput";
import GradientButton from "../../components/GradientButton";
import Routes from "../../Routes";
import LinearGradient from 'react-native-linear-gradient';
import SurveyButton from "../../components/Survey/SurveyButton";


const SurveyScreen = props => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [termsAgree, setTermsAgree] = useState(false);

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
          <View style={{width: '100%', maxWidth: 320}}>
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

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{width: '50%'}}>
                <Switch
                    value={termsAgree}
                    onValueChange={value => setTermsAgree(value)}
                />
              </View>
              <View style={{width: '50%'}}>
                <Text>I agree to Orum Training's</Text>
                <Text>Privacy Policy and Terms of Use</Text>
              </View>
            </View>

            <GradientButton
                onPress={() => {
                  // getRecipeByCodeAction(code);
                  // navigation.navigate(Routes.IngredientRecipeScreen);
                }}
                buttonContainerText="Next"
                //buttonContainerStyleProp={styles.findRecipesButton}
                colorsGradient={['#3180BD', '#6EC2FA']}
            />

            <SurveyButton
              onPress={() => {}}
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
