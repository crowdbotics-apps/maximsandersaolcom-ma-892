import React, { useState, useEffect } from 'react';

import {
  View, Text, SafeAreaView, Switch, ScrollView, KeyboardAvoidingView
} from 'react-native';
import Routes from '../../Routes';
import { withNavigation } from 'react-navigation';
import Question from '../../components/Survey/Question';
import SurveyInput from '../../components/Survey/SurveyInput';
import SurveyButton from '../../components/Survey/SurveyButton';
import SurveyTerms from '../../components/Survey/SurveyTerms';
import SurveyHeader from '../../components/Survey/SurveyHeader';
import SurveyQuestionText from '../../components/Survey/SurveyQuestionText';
import SurveyQuestionDescription from '../../components/Survey/SurveyQuestionDescription';
import SurveyQuestionOption from '../../components/Survey/SurveyQuestionOption';
import SurveyModal from "../../components/Survey/SurveyModal";


const questions = [
  // {
  //   id: 1,
  //   type: 'input',
  //   question: 'What is your weight?',
  //   description: '',
  //   options: []
  // },
  {
    id: 2,
    type: 'multiple',
    question: 'What is your gender?',
    description: 'This answer has influence on how your program is designed',
    options: [
      { option: 'Male', descritpion: '' },
      { option: 'Female', descritpion: '' },
      { option: 'Prefer not answer', descritpion: '' }
    ],
  },
  {
    id: 3,
    type: 'multiple',
    question: 'What is your level of excercise?',
    description: '',
    options: [
      { option: 'Beginner', descritpion: 'No excercise experience' },
      { option: 'Intermediate', descritpion: 'less than 2 years of training, off and on' },
      { option: 'Advanced', descritpion: 'more than 2 years of dedicated training' }
    ],

  },
];


const SurveyScreen = (props) => {
  //const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [singleQuestion, setSingleQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');

  const [isDisabled, setIsDisabled] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [modalType, setModalType] = useState('firstModal'); // firstModal || secondModal || ''

  const getQuestions = () => {
    // get questions here, maybe ASYNC

    // Data - dummy data
    //setQuestions(questions);
  };

  useEffect(() => {
    getQuestions();
  }, []);


  const setQuestion = () => {
    setIsDisabled(true);

    // questions from state
    setSingleQuestion({
      type: questions[currentQuestion].type,
      question: questions[currentQuestion].question,
      description: questions[currentQuestion].description,
      options: questions[currentQuestion].options
    });

  };

  const nextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      //open modal + send info
      props.navigation.navigate(Routes.IntroScreen); // remove this line
    } else {
      setCurrentQuestion(prevState => prevState + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion !== 0) {
      setCurrentQuestion(prevState => prevState - 1);
    } else {
      props.navigation.navigate(Routes.IntroScreen); //TODO: hide maybe back arrow on 1st question instead
    }
  };

  const selectAnswer = answer => {
    setUserAnswer(answer);
    setIsDisabled(false);
  };


  useEffect(() => {
    setQuestion();
  }, [currentQuestion]);


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [termsAgree, setTermsAgree] = useState(false);


  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <SurveyHeader
        onArrowPress={prevQuestion}
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

            <Question
                questions={questions}
                singleQuestion={singleQuestion}
                currentQuestion={currentQuestion}
                nextQuestion={nextQuestion}
                selectAnswer={selectAnswer}
                userAnswer={userAnswer}
            />


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

        </ScrollView>
        <SurveyButton
            onPress={nextQuestion}
          disabled={isDisabled}
        />
      </KeyboardAvoidingView>

      <SurveyModal
        visible={isModalVisible}
        contentType={modalType} // firstModal || secondModal
          closeModal={closeModal}
      />

    </SafeAreaView>
  );
};


export default withNavigation(SurveyScreen);
