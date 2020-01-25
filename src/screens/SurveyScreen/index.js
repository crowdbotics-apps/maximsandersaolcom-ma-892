import React, { useState, useEffect } from 'react';

import {
  View, Text, SafeAreaView, Switch, ScrollView, KeyboardAvoidingView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Question from '../../components/Survey/Question';
import SurveyInput from '../../components/Survey/SurveyInput';
import SurveyButton from '../../components/Survey/SurveyButton';
import SurveyTerms from '../../components/Survey/SurveyTerms';
import SurveyHeader from '../../components/Survey/SurveyHeader';
import SurveyQuestionText from '../../components/Survey/SurveyQuestionText';
import SurveyQuestionDescription from '../../components/Survey/SurveyQuestionDescription';
import SurveyQuestionOption from '../../components/Survey/SurveyQuestionOption';


const data = [
  {
    type: 'input',
    question: 'What is your weight?',
    description: '',
    options: []
  },
  {
    type: 'multiple',
    question: 'What is your gender?',
    description: 'This answer has influence on how your program is designed',
    options: [
      { option: 'Male', optionDescritpion: '' },
      { option: 'Female', optionDescritpion: '' },
      { option: 'Prefer not answer', optionDescritpion: '' }
    ],
  },
  {
    type: 'multiple',
    question: 'What is your level of excercise?',
    description: '',
    options: [
      { option: 'Beginner', optionDescritpion: 'No excercise experience' },
      { option: 'Intermediate', optionDescritpion: 'less than 2 years of training, off and on' },
      { option: 'Advanced', optionDescritpion: 'more than 2 years of dedicated training' }
    ],

  },
];


const SurveyScreen = (props) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [singleQuestion, setSingleQuestion] = useState({});

  const [isDisabled, setIsDisabled] = useState(true);
  console.log(questions);
  console.log(singleQuestion);

  const getQuestions = () => {
    // get questions here, maybe ASYNC

    // Data - dummy data
    setQuestions(data);
  };

  useEffect(() => {
    getQuestions();
  }, []);


  const setQuestion = () => {
    setIsDisabled(true);

    // questions from state
    // setSingleQuestion({
    //   type: questions[currentQuestion].type,
    //   question: questions[currentQuestion].question,
    //   description: questions[currentQuestion].description,
    //   options: questions[currentQuestion].options
    // });

    // from dummy data
    setSingleQuestion({
      type: data[currentQuestion].type,
      question: data[currentQuestion].question,
      description: data[currentQuestion].description,
      options: data[currentQuestion].options
    });
  };

  const nextQuestion = () => {
    setCurrentQuestion(prevState => prevState + 1);
  };

  useEffect(() => {
    setQuestion();
  }, [currentQuestion]);


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
            <Text onPress={() => nextQuestion()}>666</Text>


            <Question
                questions={questions}
                singleQuestion={singleQuestion}
                currentQuestion={currentQuestion}
                nextQuestion={nextQuestion}
                disabled={isDisabled}
            />

            <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#d3d3d3' }}>
              <SurveyQuestionText>What is your gender?</SurveyQuestionText>
              <SurveyQuestionDescription>This answer has influence on how your program is designed</SurveyQuestionDescription>
            </View>

            <SurveyQuestionOption
              onPress={() => {
              }}
            >
Male
            </SurveyQuestionOption>
            <SurveyQuestionOption>Female</SurveyQuestionOption>
            <SurveyQuestionOption>Prefer not answer</SurveyQuestionOption>


            {/* <SurveyQuestionText>What is your name?</SurveyQuestionText> */}
            {/* <View style={{ marginBottom: 35 }}> */}
            {/*  <SurveyInput */}
            {/*    placeholder="First" */}
            {/*    value={firstName} */}
            {/*    onChangeText={setFirstName} */}
            {/*  /> */}
            {/*  <SurveyInput */}
            {/*    placeholder="Last" */}
            {/*    value={lastName} */}
            {/*    onChangeText={setLastName} */}
            {/*  /> */}
            {/* </View> */}

            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}> */}
            {/*  <View style={{ width: '40%' }}> */}
            {/*    <Switch */}
            {/*      style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} */}
            {/*      value={termsAgree} */}
            {/*      onValueChange={value => setTermsAgree(value)} */}
            {/*    /> */}
            {/*  </View> */}
            {/*  <View style={{ width: '60%' }}> */}
            {/*    <SurveyTerms /> */}
            {/*  </View> */}
            {/* </View> */}


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
