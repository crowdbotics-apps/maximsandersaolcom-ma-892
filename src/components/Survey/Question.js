import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Switch
} from 'react-native';
import SurveyQuestionText from './SurveyQuestionText';
import SurveyQuestionDescription from './SurveyQuestionDescription';
import SurveyQuestionOption from './SurveyQuestionOption';
import SurveyInput from './SurveyInput';
import SurveyRow from './SurveyRow';
import SurveyTerms from './SurveyTerms';


const Question = ({
  questions, singleQuestion, currentQuestion, nextQuestion, selectAnswer, userAnswer
}) => {
  const {
    type, question, description, options
  } = singleQuestion;

  // send firstName, lastName on termsAgree as an {}
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [termsAgree, setTermsAgree] = useState(false);

  const [birthday, setBirthday] = useState('');


  let questionType;

  switch (type) {
    case 'name':
      questionType = (
        <>
          <View style={{ marginBottom: 35 }}>
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

          <SurveyRow>
            <View style={{ width: '40%' }}>
              <Switch
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                value={termsAgree}
                onValueChange={value => {
                    setTermsAgree(value);
                    selectAnswer({name: firstName, lastName});
                }}
              />
            </View>
            <View style={{ width: '60%' }}>
              <SurveyTerms />
            </View>
          </SurveyRow>
        </>
      );
      break;

      case 'birthday':
          questionType = (
              <SurveyInput
                  placeholder='Birthday'
                  value={birthday}
                  onChangeText={(value) => {
                      setBirthday(value);
                      //selectAnswer(birthday);
                  }}
              />
          );
          break;

      case 'multiple':
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
          break;

      default: break;
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
