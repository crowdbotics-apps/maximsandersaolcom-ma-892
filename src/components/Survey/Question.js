import React, { useState } from 'react';
import {
  View, Switch, ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SurveyQuestionText from './SurveyQuestionText';
import SurveyQuestionDescription from './SurveyQuestionDescription';
import SurveyQuestionOption from './SurveyQuestionOption';
import SurveyInput from './SurveyInput';
import SurveyRow from './SurveyRow';
import SurveyTerms from './SurveyTerms';
import SurveyButton from './SurveyButton';


const Question = ({
  questions, singleQuestion, currentQuestion, nextQuestion, selectAnswer, userAnswer, isDisabled, setIsDisabled, getFirstName
}) => {
  const {
    type, question, description, options
  } = singleQuestion;


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [termsAgree, setTermsAgree] = useState(false);

  const [birthday, setBirthday] = useState(new Date());
  const [formatBirthday, setFormatBirthday] = useState('');
  // const birthdayFormatted = birthday.toLocaleDateString();
  const [units, setUnits] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [answerOption, setAnswerOption] = useState('');

  const [isPicker, setIsPicker] = useState(false);


  const handleAnswer = () => {
    if (type === 'name') {
      selectAnswer({ name: firstName, lastName });
    }

    if (type === 'birthday') {
      selectAnswer(birthday);
    }

    if (type === 'multiple') {
      selectAnswer(answerOption);
    }

    if (type === 'units') {
      selectAnswer(answerOption);
      setUnits(answerOption);
    }

    if (type === 'height') {
      selectAnswer(height);
    }

    if (type === 'weight') {
      selectAnswer(weight);
    }

    nextQuestion();
  };


  const togglePicker = (value) => {
    setIsPicker(value);
  };

  const setBirthdayData = (event, date) => {
    setBirthday(date);
    setFormatBirthday(date.toLocaleDateString());
    setIsDisabled(false);
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
              onChangeText={(value) => {
                setFirstName(value);
                getFirstName(value);
              }}
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
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }, { translateX: 10 }] }}
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
        <>
          <SurveyInput
            placeholder="Birthday"
            value={formatBirthday}
            showPicker={togglePicker}
          />
          {isPicker
                    && (
                    <DateTimePicker
                      value={birthday}
                      display="default"
                      onChange={setBirthdayData}
                      maximumDate={new Date()}
                      minimumDate={new Date(1940, 0, 1)}
                    />
                    )
                    }
        </>
      );
      break;

    case 'units':
      questionType = options && options.map((answer, index) => (
        <SurveyQuestionOption
          key={index}
          onPress={() => {
            setAnswerOption(answer.option);
            setIsDisabled(false);
          }}
          description={answer.descritpion}
          isSelected={answer.option === answerOption}
        >
          {answer.option}
        </SurveyQuestionOption>
      ));
      break;

    case 'multiple':
      questionType = options && options.map((answer, index) => (
        <SurveyQuestionOption
          key={index}
          onPress={() => {
            setAnswerOption(answer.option);
            setIsDisabled(false);
          }}
          description={answer.descritpion}
          isSelected={answer.option === answerOption}
        >
          {answer.option}
        </SurveyQuestionOption>
      ));
      break;

    case 'height':
      questionType = (
        <SurveyInput
          placeholder={units === 'Feet/Pounds' ? 'Feet' : 'Centimeters'}
          value={height}
          onChangeText={(value) => {
            setHeight(value);
            setIsDisabled(false);
          }}
          keyboardType="numeric"
        />
      );

      break;

    case 'weight':
      questionType = (
        <SurveyInput
          placeholder={units === 'Feet/Pounds' ? 'Pounds' : 'Kilograms'}
          value={weight}
          onChangeText={(value) => {
            setWeight(value);
            setIsDisabled(false);
          }}
          keyboardType="numeric"
        />
      );
      break;

    default:
      break;
  }


  return (
    <>
      <View style={{ flex: 6, justifyContent: 'center' }}>
        <ScrollView style={{ flex: 1 }}>
          <SurveyQuestionText>{question}</SurveyQuestionText>
          {description ? <SurveyQuestionDescription>{description}</SurveyQuestionDescription> : null}
          {questionType}
        </ScrollView>
      </View>
      <SurveyButton
        onPress={() => {
          handleAnswer();
        }}
        disabled={isDisabled}
      />
    </>
  );
};

export default Question;
