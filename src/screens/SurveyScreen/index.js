import React, { useState, useEffect } from 'react';

import {
  View, SafeAreaView, ScrollView, KeyboardAvoidingView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import {useDispatch, useSelector} from "react-redux";
import Routes from '../../Routes';
import Question from '../../components/Survey/Question';
import SurveyHeader from '../../components/Survey/SurveyHeader';
import SurveyModal from '../../components/Survey/SurveyModal';
import ProgressBar from '../../components/Survey/ProgressBar';
import * as surveyActions from '../../redux/actions/survey'


const questionsData = [
  {
    id: 1,
    type: 'name',
    question: 'What is your name?',
    description: '',
    options: [],
    answer: ''
  },
  {
    id: 2,
    type: 'birthday',
    question: 'When were you born?',
    description: '',
    options: [],
    answer: ''
  },
  {
    id: 3,
    type: 'multiple',
    question: 'What is your gender?',
    description: 'This answer has influence on how your program is designed',
    options: [
      { option: 'Male', descritpion: '' },
      { option: 'Female', descritpion: '' },
      { option: 'Prefer not answer', descritpion: '' }
    ],
    answer: ''
  },
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
    answer: ''
  },
  {
    id: 5,
    type: 'multiple',
    question: 'What is your activity level?',
    description: '',
    options: [
      {
        option: 'Sedentary',
        descritpion: 'Office job, watches TV for extended periods, video gaming, minimal movement on a daily basis'
      },
      {
        option: 'Low Activity',
        descritpion: '30-60 minutes per day of moderate intensity physical activity (210-240 minutes per week)'
      },
      { option: 'Active', descritpion: 'At least 60 minutes per day of moderate intensity physical activity' },
      { option: 'Very Active ', descritpion: '120 minutes per day of vigorous physical activity' }
    ],
    answer: ''
  },
  {
    id: 6,
    type: 'units',
    question: 'Choose units of measurement',
    description: '',
    options: [
      { option: 'Feet/Pounds', descritpion: '' },
      { option: 'Meters/Kilograms', descritpion: '' },
    ],
    answer: ''
  },
  {
    id: 7,
    type: 'height',
    question: 'What is your height?',
    description: '',
    options: [],
    answer: ''
  },
  {
    id: 8,
    type: 'weight',
    question: 'What is your weight?',
    description: '',
    options: [],
    answer: ''
  },
  {
    id: 9,
    type: 'multiple',
    question: 'What is your fitness goal?',
    description: '',
    options: [
      { option: 'Fat loss', descritpion: 'weight loss, figure change, general wellness' },
      { option: 'Strength and Hypertrophy', descritpion: 'powerlifting and bodybuilding' },
      { option: 'Maintenance', descritpion: 'maintain current weight/figure' },
    ],
    answer: ''
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
    answer: ''
  },
  {
    id: 11,
    type: 'multiple',
    question: 'How many meals do you prefer to eat in one day?',
    description: '',
    options: [
      { option: '4 meals', descritpion: '' },
      { option: '5 meals', descritpion: '' },
      { option: '6 meals', descritpion: '' },
    ],
    answer: ''
  },
  {
    id: 12,
    type: 'eatTime',
    question: 'What times do you want to eat?', // Modify the logic
    description: '',
    options: [],
    answer: ''
  },
  {
    id: 13,
    type: 'multiple',
    question: 'What is your level of understanding nutrition?',
    description: '',
    options: [
      { option: 'Beginner', descritpion: 'No real understanding of nutrition' },
      { option: 'Intermediate', descritpion: 'I have tried diets before, and had mediocre results' },
      { option: 'Advanced', descritpion: 'I am educated in nutrition' },
    ],
    answer: ''
  },
];


const SurveyScreen = (props) => {

const dispatch = useDispatch();

  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [singleQuestion, setSingleQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');

  const [answers, setAnswers] = useState([]);

  console.log('With answers ', answers);

  const [isDisabled, setIsDisabled] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // firstModal || secondModal || thirdModal

  const [percentage, setPercentage] = useState(0);
  const [userName, setUserName] = useState('');


  const setQuestion = () => {
    setIsDisabled(true);

    // questions from state
    setSingleQuestion({
      id: questions[currentQuestion].id,
      type: questions[currentQuestion].type,
      question: questions[currentQuestion].question,
      description: questions[currentQuestion].description,
      options: questions[currentQuestion].options
    });
  };

  const nextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setIsModalVisible(true);
      setModalType('thirdModal');
      // props.navigation.navigate(Routes.IntroScreen); // remove this line
    } else {
      setCurrentQuestion(prevState => prevState + 1);
    }

    // Increase progress bar
    setPercentage(((currentQuestion + 1) / questions.length) * 100);

    if (currentQuestion === 2) {
      setIsModalVisible(true);
      setModalType('firstModal');
    }

    if (currentQuestion === 9) {
      setIsModalVisible(true);
      setModalType('secondModal');
    }
  };

  const prevQuestion = () => {
    setIsDisabled(false);
    if (currentQuestion !== 0) {
      setCurrentQuestion(prevState => prevState - 1);
    } else {
      props.navigation.navigate(Routes.StartupScreen);
    }
  };

  const selectAnswer = (answer) => {
    setUserAnswer(answer);
    setIsDisabled(false);

    singleQuestion.answer = answer;
    //
    // setAnswers(prevState => [...prevState, singleQuestion]);

    setAnswers(prevState => {
      const questions = prevState.filter(item => item.id !== singleQuestion.id);
      return [...questions, singleQuestion]
    });
  };


  useEffect(() => {
    setQuestion();
  }, [currentQuestion]);


  const closeModal = () => {
    setIsModalVisible(false);
  };

  const getFirstName = (name) => {
    setUserName(name);
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
          <ProgressBar
            percentage={percentage}
          />
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
              getFirstName={getFirstName}
            />

          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <SurveyModal
        visible={isModalVisible}
        contentType={modalType} // firstModal || secondModal
        closeModal={closeModal}
        userName={userName}
        answers={answers}
      />
    </SafeAreaView>
  );
};


export default withNavigation(SurveyScreen);
