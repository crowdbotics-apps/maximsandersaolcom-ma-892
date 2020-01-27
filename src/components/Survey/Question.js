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
import SurveyButton from './SurveyButton';


const Question = ({
  questions, singleQuestion, currentQuestion, nextQuestion, selectAnswer, userAnswer, isDisabled, setIsDisabled
}) => {
  const {
    type, question, description, options
  } = singleQuestion;


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [termsAgree, setTermsAgree] = useState(false);

  const [birthday, setBirthday] = useState('');

  const handleAnswer = () => {
    // Multiple is handled inside question type
    if (type === 'name') {
      selectAnswer({ name: firstName, lastName });
    }

    if (type === 'birthday') {
      selectAnswer(birthday);
      setIsDisabled(false);
    }

    nextQuestion();
  };

  let questionType;

  switch (type) {
    case 'name':
      questionType = (
        <>
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

          <SurveyRow>
            <View style={{ width: '40%' }}>
              <Switch
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                value={termsAgree}
                onValueChange={(value) => {
                  setTermsAgree(value);
                  setIsDisabled(false);
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
          placeholder="Birthday"
          value={birthday}
          onChangeText={(value) => {
            setBirthday(value);
            setIsDisabled(false);
          }}
        />
      );
      break;

    case 'multiple':
      questionType = options && options.map((answer, index) => (
        <SurveyQuestionOption
          key={index}
          onPress={() => {
              selectAnswer(answer.option);
              setIsDisabled(false);
          }}
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
      <View style={{ flex: 3, justifyContent: 'center' }}>
        <SurveyQuestionText>{question}</SurveyQuestionText>
        {description ? <SurveyQuestionDescription>{description}</SurveyQuestionDescription> : null}

        {questionType}

      </View>
      <SurveyButton
        onPress={() => {
          handleAnswer();
        }}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default Question;
