import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SurveyQuestionText from './SurveyQuestionText';
import SurveyQuestionDescription from './SurveyQuestionDescription';
import SurveyQuestionOption from './SurveyQuestionOption';
import SurveyInput from './SurveyInput';


const Question = ({
  questions, singleQuestion, currentQuestion, nextQuestion, selectAnswer, userAnswer
}) => {
  const {
    type, question, description, options
  } = singleQuestion;


  let questionType;
  if (type === 'multiple') {
    questionType = options && options.map((answer, index) => (
      <SurveyQuestionOption
        key={index}
        onPress={() => selectAnswer(answer.option)}
        description={answer.descritpion}
        isSelected={answer.option === userAnswer}
      >
        {answer.option}
      </SurveyQuestionOption>
    ));
  } else {
    questionType = (
      <SurveyInput
        placeholder="First"
        value={() => {}}
        onChangeText={() => {}}
      />
    );
  }


  return (
    <>
      <View>
        <SurveyQuestionText>{question}</SurveyQuestionText>
        {description ? <SurveyQuestionDescription>{description}</SurveyQuestionDescription> : null}
      </View>

      {questionType}
    </>
  );
};

export default Question;
