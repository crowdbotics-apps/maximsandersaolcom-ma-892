import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import HeaderForDrawer from '../../components/HeaderForDrawer';
import TodayContainerHorizontal from './TodayContainerHorizontal';
import TodayInfo from '../../components/TodayInfo';
import GradientButton from '../../components/GradientButton';
import MealItem from '../../components/MealItem';

const IngredientRecipeContainer = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%' }}>
        <HeaderForDrawer
          onDrawerButtonPress={() => {}}
        />
        <TodayInfo
          description="Strength and Cardio"
          dayNumber="1"
          weekNumber="1"
        />
        <TodayContainerHorizontal
          sliderTitle="Biceps and Triceps"
          navigation={navigation}
          data={[]}
          onSelectItem={() => {}}
        />
        <View
          style={styles.buttonContainer}
        >
          <GradientButton
            buttonContainerText="Start Workout"
            buttonContainerStyleProp={styles.findRecipesButtonContainer}
            buttonContainerTextStyle={styles.buttonContainerTextStyle}
            colorsGradient={['#3180BD', '#6EC2FA']}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white'
  },
  findRecipesButtonContainer: {
    width: '90%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 0,
    paddingBottom: 18,
    borderRadius: 10,
    marginRight: 0
  },
  buttonContainerTextStyle: {
    fontSize: 21,
    fontWeight: 'normal',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});

export default IngredientRecipeContainer;
