import React, { useState, useEffect } from 'react';

import {
  View, Text, SafeAreaView, Switch, ScrollView, KeyboardAvoidingView
} from 'react-native';
import Routes from '../../Routes';
import { withNavigation } from 'react-navigation';
import Question from '../../components/Survey/Question';
import SurveyButton from '../../components/Survey/SurveyButton';
import SurveyHeader from '../../components/Survey/SurveyHeader';
import SurveyModal from "../../components/Survey/SurveyModal";


const questions = [
  // {
  //   id: 1,
  //   type: 'name',
  //   question: 'What is your name?',
  //   description: '',
  //   options: []
  // },
  // {
  //   id: 2,
  //   type: 'birthday',
  //   question: 'When were you born?',
  //   description: '',
  //   options: []
  // },
  // {
  //   id: 3,
  //   type: 'multiple',
  //   question: 'What is your gender?',
  //   description: 'This answer has influence on how your program is designed',
  //   options: [
  //     { option: 'Male', descritpion: '' },
  //     { option: 'Female', descritpion: '' },
  //     { option: 'Prefer not answer', descritpion: '' }
  //   ],
  // },
  {
    id: 4,
    type: 'multiple',
    question: 'What is your level of excercise?',
    description: '',
    options: [
      { option: 'Beginner', descritpion: 'No excercise experience' },
      { option: 'Intermediate', descritpion: 'less than 2 years of training, off and on' },
      { option: 'Advanced', descritpion: 'more than 2 years of dedicated training' }
    ],
  },
  {
    id: 5,
    type: 'multiple',
    question: 'What is your activity level??',
    description: '',
    options: [
      { option: 'Sedentary', descritpion: 'Office job, watches TV for extended periods, video gaming, minimal movement on a daily basis' },
      { option: 'Low Activity', descritpion: '30-60 minutes per day of moderate intensity physical activity (210-240 minutes per week)' },
      { option: 'Active', descritpion: 'At least 60 minutes per day of moderate intensity physical activity'},
      { option: 'Very Active ', descritpion: '120 minutes per day of vigorous physical activity'}
    ],
  },
  {
    id: 6,
    type: 'multiple',
    question: 'Choose units of measurement',
    description: '',
    options: [
      { option: 'Feet/Pounds', descritpion: '' },
      { option: 'Meters/Kilograms', descritpion: '' },
    ],
  },
  {
    id: 7,
    type: 'height',
    question: 'What is your height?',
    description: '',
    options: [],
  },
  {
    id: 8,
    type: 'weight',
    question: 'What is your weight?',
    description: '',
    options: [],
  },
  {
    id: 9,
    type: 'multiple',
    question: 'What is your fitness goal?',
    description: '',
    options: [
      { option: 'Fat loss', descritpion: 'weight loss, figure change, general wellness' },
      { option: 'Strength and Hypertrophy', descritpion: 'powerlifting and bodybuilding' },
      { option: 'Maintenance', descritpion: 'maintain current weight/figure'},
    ],
  },
  {
    id: 10,
    type: 'multiple',
    question: 'How many days a week do you want to train?',
    description: '',
    options: [
      { option: '3 Days', descritpion: '' },
      { option: '4 Days', descritpion: '' },
      { option: '5 Days', descritpion: '' },
    ],
  },

];


const SurveyScreen = (props) => {
  //const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [singleQuestion, setSingleQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');

  const [answers, setAnswers] = useState([]);
console.log(answers);
  const [isDisabled, setIsDisabled] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false); // TODO: add logic after answers compleated
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
    setIsDisabled(false);
    if (currentQuestion !== 0) {
      setCurrentQuestion(prevState => prevState - 1);
    } else {
      props.navigation.navigate(Routes.IntroScreen); //TODO: hide maybe back arrow on 1st question instead
    }
  };

  const selectAnswer = answer => {
    setUserAnswer(answer);
    setIsDisabled(false);

    setAnswers(prevState => [...prevState, answer]);
  };


  useEffect(() => {
    setQuestion();
  }, [currentQuestion]);



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
          <Text>Progress bar here</Text>
          <View style={{ flex: 1, width: '100%', maxWidth: 320, }}>

            <Question
                questions={questions}
                singleQuestion={singleQuestion}
                currentQuestion={currentQuestion}
                nextQuestion={nextQuestion}
                selectAnswer={selectAnswer}
                userAnswer={userAnswer}
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
            />

          </View>

        </ScrollView>
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
